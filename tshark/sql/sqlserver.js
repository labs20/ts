/**
 * Conector ao SQLServer baseado em seriate.
 * @see <a href="https://github.com/LeanKit-Labs/seriate">Seriate</a>
 * @author labs
 * @since 10/03/2016
 * @extends SQL
 * @param connParams Parâmetros de conexão
 * @param path { BizObject.path }
 * @param obj { BizObject } opcional
 * @constructor
 */
function SQLServer(connParams, path, obj){

    // Inicializa
    this.init(connParams, path, obj);

    // Conexão
    Seriate.setDefaultConfig({
      //  name    : 'default',
        server  : this.connParams['host'],
        user    : this.connParams['user'],
        password: this.connParams['pwd'],
        database: this.connParams['database'],
        pool: {
            max: 10,
            min: 4,
            idleTimeoutMillis: 30000
        }
    });
}

//region :: Includes

const util      = require('util');
var Seriate     = require('seriate');

//endregion



//region :: Parsing

/**
 * Recebe um sqlParams e monta um SELECT statement
 * @param db { SQL }
 * @param req
 */
function parseSQL(db, req){
    var sql = '', v = '';

    if (db.sqlParams.limit.max){
        sql += ' WITH Ordered AS ( \n';
        sql += '      SELECT  TOP(999999999) row_number() OVER (ORDER BY ' +
                         (db.sqlParams.order.length ? db.sqlParams.order : db.sqlParams.key.field) +
                      ') as _resultNum_, COUNT(*) OVER () _totalrows_, \n';

    } else {
        sql += ' SELECT ';
    }
    for (var fld in db.sqlParams.fields){
        sql += v + db.sqlParams.fields[fld] + '.' + fld;
        v = ' ,';
    }

    sql += '\n    FROM ' + db.sqlParams.table + ' ' + db.sqlParams.alias + ' (nolock)';
    sql += '\n' + db.sqlParams.joins.join('\n');
    sql += '\n  WHERE 1=1 ';

    // Processa where
    sql += db.parseWhere(req);

    // Processa search
    if (db.sqlParams['search'] && req.query['query']){
        sql += db.parseSearch(req);
    }

    if (db.sqlParams.group.length){
        sql += '\n  GROUP BY ' + db.sqlParams.group.join(', ');
    }
    if (db.sqlParams.having.length){
        sql += '\n  HAVING ' + db.sqlParams.havend.join(', ');
    }
    if (db.sqlParams.order.length){
        sql += '\n  ORDER BY ' + db.sqlParams.order.join('\n');
    }

    if (db.sqlParams.limit.max){
        var start = (parseInt(db.sqlParams.limit.page) * parseInt(db.sqlParams.limit.max)) +1
            , end = (start + parseInt(db.sqlParams.limit.max)) -1
        ;
        sql += ')' +
               ' SELECT  * ' +
               '   FROM Ordered ' +
               '  WHERE _resultNum_ >= ' + (start ? start : 0) +
                  ' AND _resultNum_ <= ' + (end   ? end   : db.sqlParams.limit.max);
    }
    return sql;
}

SQLServer.prototype.parseJoin = function(join, table, alias, nolock) {
    return this._parseJoin(join, table, alias, ' (nolock) ');
};

/**
 * Executa um SELECT com base em sqlParams
 * @param provider
 * @param req
 * @param onData { function(result) }
 * @param onError { function(err, sql) }
 */
SQLServer.prototype.select = function(provider, req, onData, onError){

    // Parent
    if (this._select(provider, req, onData, onError)) {

        // Executa
        var sql = parseSQL(this, req)
            , db = this;
        Seriate.execute({
            query: sql
        })
            .then(

                // OK
                function (results) {

                    // Processa
                    var data = db.processResults(results, sql);

                    // Envia
                    onData.call(db, data);
                },

                // Erro
                function (err) {
                    onError.call(db.obj, err, sql);
                }
            );
    }
};

SQLServer.prototype.load = function(provider, req){

    // Parent
    if (this._load(provider, req)) {

        // Executa
        var sql = parseSQL(this, req)
            , db = this;
        return Seriate.execute({
            query: "select * from owhs"
        }/*)
            .then(

                // OK
                function (results) {

                    // Processa
                    var data = db.processResults(results, sql);

                    // Envia
                    onData.call(db, data);
                },

                // Erro
                function (err) {
                    onError.call(db.obj, err, sql);
                }*/
            );

    }
};




// Exporta
module.exports = SQLServer;
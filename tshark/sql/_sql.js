/**
 * Driver para conexões a datasources baseados em SQL.
 * @author labs
 * @since 10/03/2016
 * @param req
 * @constructor
 */
function SQL(req){

}

//region :: Includes

const util      = require('util')
    , _         = require('underscore')
    , moment    = require('moment')
;

//endregion


/**
 * Inicializa o driver
 * @param connParams
 * @param path { BizObject.path }
 * @param obj { BizObject }
 */
SQL.prototype.init = function(connParams, path, obj){

    // Parametros de conexão
    this.connParams = connParams.conn;

    // Referencia ao objeto
    this.obj = obj;

    // Path
    this.path = path;

    /**
     * Armazena estrutura extraida do provider
     * @type {{
     *      table   : '',
     *      alias   : '',
     *      distinct: '',
     *      fields  : [],
     *      joins   : [],
     *      meta    : {},
     *      key     : {field: '', val: ''},
     *      where   : [],
     *      group   : [],
     *      having  : [],
     *      order   : [],
     *      limit   : {max: 0, page: 0},
     *      showSQL : false
     * }}
     */
    this.sqlParams = {};

};


// region :: Utils

/**
 * Verifica se o texto é uma data válida
 * @param str {string}
 * @returns {boolean}
 */
function isDate(str){
    if (!str) return false;
    var sep = (str.indexOf('/') > -1
            ? '/'
            : str.indexOf('-') > -1
            ? '-'
            : ''
    );
    if (!sep) return false;

    var tmp = str.split(sep);
    if (tmp.length != 3) return false;

    if (!util.isNumber(tmp[0]) ||
        !util.isNumber(tmp[1]) ||
        !util.isNumber(tmp[2])) return false;

    return true;
}

//endregion


//region :: Parsing


//region :: Overrides de processamento


/**
 * Processa um provider e o transforma em sqlParams
 * @param provider {{
 *      sources: {
 *          0: {
 *              from: ['', '']
 *              join: {source: 0, tipo: 'inner', on: 'map_filiais_key', where: ''},
 *              fields: []
 *          }
 *      },
 *      where: [
 *          ['AND', 0, 'field', '=', 'value']
 *      ],
 *      order: [],
 *      group: [],
 *      having: [],
 *      limit: 100,
 *      showSQL: false
 * }}
 * @param req
 */
SQL.prototype.parseProvider = function(provider, req){
    return this._parseProvider(provider, req);
};


/**
 * Ajusta fields em sqlParams
 * @param prov
 * @param ctx_fields
 * @param meta_fields
 * @param alias
 */
SQL.prototype.parseFields = function(prov, ctx_fields, meta_fields, alias){
    return this._parseFields(prov, ctx_fields, meta_fields, alias);
};


/**
 * Identifica os joins
 * @param join { {source: 0, tipo: 'inner', on: 'map_filiais_key', where: ''} }
 * @param table
 * @param alias
 * @param nolock
 */
SQL.prototype.parseJoin = function(join, table, alias, nolock) {
    return this._parseJoin(join, table, alias, '');
};


/**
 * Processa req.query e alimenta where
 * @param req { req }
 * @returns { string }
 */
SQL.prototype.parseWhere = function(req){
    return this._parseWhere(req);
};


/**
 * Processa req.query e alimenta search
 * @param req { req }
 * @returns { string }
 */
SQL.prototype.parseSearch = function(req){
    return this._parseSearch(req);
};


//endregion


//region :: Implementações internas default


/**
 * Processa um provider e o transforma em sqlParams
 * @param provider
 * @param req
 * @private
 */
SQL.prototype._parseProvider = function(provider, req){

    if (req.query['provider']){
        provider = _.extend(provider, req.query['provider']);
    }

    // Ajusta sqlParams
    this.sqlParams = {
        key     : {field: '', val: ''},
        fields  : provider['fields'] || {},
        meta    : {},
        joins   : [],
        where   : provider['where']  || [],
        search  : provider['search'] || [],
        group   : provider['group']  || [],
        having  : provider['having'] || [],
        order   : provider['order']  || [],
        limit   : {max: provider['limit'] || 0, page: 0},
        showSQL : provider['showSQL'] || false
    };

    var fields = req.params['_fields'] || [];

    // Processa provider
    for(var a in provider.sources){

        var s_own = this.path.owner
            , s_pck = this.path.pack
            , s_tbl
            , s_join
            , s_fields
        ;

        var prov    = provider.sources[a]
            , alias = 'tb' + a
            ;
        switch (prov.from.length) {
            case 1:
                s_tbl = prov.from[0];
                break;

            case 2:
                s_pck = prov.from[0];
                s_tbl = prov.from[1];
                break;

            case 3:
                s_own = prov.from[0];
                s_pck = prov.from[1];
                s_tbl = prov.from[2];
                break;

            default:
                throw 'Source em formato invalido no provider';
        }

        // Recupera source
        req.params['_path'] = [s_own, s_pck, s_tbl];
        var mod = new (require('../biz_object.js'))(req);
        var source = mod.bizObj.source;

        // Tabela principal
        if (!this.sqlParams['table']) {
            this.sqlParams.table = source.table;
            this.sqlParams.key.field = source.metadata.key;
            this.sqlParams.key.val = req.query[source.metadata.key];
            this.sqlParams.alias = alias;
            this.sqlParams.distinct = prov['distinct'];
        }

        // Fields
        this.parseFields(prov, fields, source.metadata.fields, alias);

        // Joins
        if (prov['join']) {
            this.parseJoin(prov['join'], source.table, alias, this.sqlParams, this.db);
        }
    }

};


/**
 * Ajusta fields em sqlParams
 * @param prov
 * @param ctx_fields
 * @param meta_fields
 * @param alias
 * @private
 */
SQL.prototype._parseFields = function(prov, ctx_fields, meta_fields, alias){

    // Fields forçados
    if (prov['force_fields'] && util.isArray(prov['force_fields'])){
        prov['force_fields'].forEach(function(f){
            if (!this.sqlParams.fields[f]) {
                this.sqlParams.fields[f] = alias;
            }
        }, this);

        // Fields mapeados
    } else {
        for (var f in meta_fields){

            // Primeiro a chegar entra
            if (!this.sqlParams.fields[f]) {
                var ok = false;

                // Acrescenta _key
                if (f.substr(-4) == '_key') {
                    ok = true;
                }

                // Select all em fields
                if (prov['fields'] && (prov['fields'] == '*' || prov['fields'][0] == '*')) {
                    ok = true;
                }

                // Explicitamente requisitado
                if (prov['fields'] && prov['fields'].indexOf(f) > -1) {
                    ok = true;
                    prov['fields'][prov['fields'].indexOf(f)] = null;
                }

                // Em contexto
                if (ctx_fields.indexOf(f) > -1){
                    ok = true;
                }

                if (ok) {
                    this.sqlParams.fields[f] = alias;
                    this.sqlParams.meta[f] = meta_fields[f];
                }
            }
        }
    }

    // Fields de função
    if (prov['fields'] && util.isArray(prov['fields'])) {
        prov['fields'].forEach(function (f) {
            if (f && typeof f === 'object') {
                this.sqlParams.fields[f] = alias;
            }
        }, this);
    }

};


/**
 * Identifica os joins
 * @param join { {source: 0, tipo: 'inner', on: 'map_filiais_key', where: ''} }
 * @param table
 * @param alias
 * @param nolock
 * @private
 */
SQL.prototype._parseJoin = function(join, table, alias, nolock){

    // Join implicito
    if (join['tipo'] == 'implicit') {
        this.sqlParams.joins.push(", " + table + " as " + alias + ' ' + nolock);

    // Join 'à mão'
    } else if (join['tipo'] == 'sql'){
        this.sqlParams.joins.push(join['sql']);

    // Join normal
    } else {
        var template = " %s JOIN %s %s ON (%s %s %s ";
        /*if (join['where']) {
         var wtempl = " %s tb%s.%s %s '%s' ";
         var jwhere = parseWhereItem(join['where'], $params['master']['dataset']);
         foreach ($jwhere as $w){
         //array($tbRef, $key, $cond, '=', $where_key);
         if (is_string($w)) {
         $template .= $w;
         } else {
         if ($w[4] == 'NULL') {
         $wtempl = " %s tb%s.%s %s %s ";
         }
         $template .= sprintf($wtempl, $w[0], $w[1], $w[2], $w[3], $w[4]);
         }
         }
         }*/
        template += ")";

        var
            opt             = (join['opt'] ? join['opt'] : '=')
            , that_alias    = "tb" + join['source']
            , this_key
            , that_key
            ;

        // Chaves idênticas em ambas tabelas
        if (!util.isArray(join['key'])){
            this_key = alias + '.' + join['on'];
            that_key = that_alias + '.' + join['on'];

            // Chaves diferentes nas tabelas:
        } else {
            this_key = alias + '.' + join['on'][0];
            that_key = that_alias + '.' + join['on'][1];
        }

        this.sqlParams.joins.push(
            util.format(template,
                join['tipo'], table, alias + ' ' + nolock, this_key, opt, that_key
            )
        );
    }
};


/**
 * Processa where
 * @param req
 * @private
 */
SQL.prototype._parseWhere = function(req){

    var sql     = ''
        , templ = ' %s tb%s.%s %s %s ';
    this.sqlParams.where.forEach(function(where){

        // Where digitado
        if (typeof where == 'string'){
            sql += ' ' + where + ' ';

        // Where composto
        } else {

            // ["AND", '0', "map_filiais_key", "check"]
            if (where.length == 4){
                var flag    = where.pop()
                    , val   = req.query[where[2]]
                ;

                if (val == 'NEW_KEY' || (!val && flag.toUpperCase() == 'GET')){
                    val = -999;
                }

                if (val){
                    where.push('=');
                    where.push("'" + val + "'");

                } else {
                    where = [];
                }
            }

            if (where.length){
                where.unshift(templ);
                sql += util.format.apply(util, where);
            }

        }
    });

    // Retorna
    return sql;
};


/**
 * Processa req.query e alimenta search
 * @param req
 * @private
 */
SQL.prototype._parseSearch = function(req){
    var sql     = ''
        ,qry    = req.query['query'].split(' ');

    var glue = ' AND ', maior = false, menor = false;
    this.sqlParams['search'].forEach(function(param){

        switch (param.param.toUpperCase()) {

            case 'LIKE':
                qry.forEach(function (q) {
                    sql += glue + 'tb' + param.alias + '.' + param.field + " LIKE '%" + q + "%'";
                    glue = ' OR ';
                });
                break;

            case 'IN':
                sql += glue + 'tb' + param.alias + '.' + param.field + " IN ('" + qry.join("', '") + "')";
                break;

            case '>':
            case '>=':
                if (!maior) {
                    maior = true;
                    qry.forEach(function (q) {
                        if (util.isNumber(q) || isDate(q)) {
                            sql += glue + 'tb' + param.alias + '.' + param.field + " > '" + q + "'";
                            glue = ' OR ';
                        }
                    });
                }
                break;

            case '<':
            case '<=':
                if (!menor) {
                    menor = true;
                    qry.forEach(function (q) {
                        if (util.isNumber(q) || isDate(q)) {
                            sql += glue + 'tb' + param.alias + '.' + param.field + " < '" + q + "'";
                            glue = ' OR ';
                        }
                    });
                }
                break;

            default:
                qry.forEach(function (q) {
                    sql += glue + 'tb' + param.alias + '.' + param.field + " " + param.param + " '" + q + "'";
                    glue = ' OR ';
                });
                break;
        }
    });

    return sql;
};


//endregion


//endregion


//region :: CRUD

/**
 * Retorna um pacote no formato padrão
 * @returns {{index: {}, rows: Array, page: number}}
 */
function getDataPack(){
    return {
        index: {},
        rows: [],
        page: 0
    };
}

/**
 * Executa o parsing do provider, e se for um select para insert
 * interrompe o processo enviando um row default para o client.
 * @param provider
 * @param req { req }
 * @param onDataFunc { function(result) } Função chamada para retorno dos dados
 * @param onErrorFunc { function(err, sql) } Função chamada em caso de erro
 * @private
 */
SQL.prototype._select = function(provider, req, onDataFunc, onErrorFunc){
    this.parseProvider(provider, req);

    // Row de insert
    if (this.sqlParams.key.val == 'NEW_KEY'){
        var row = {_key_: 'NEW_KEY'};
        for (var f in this.sqlParams.fields){
            var val     = ''
                , tipo  = this.sqlParams.meta[f]['tipo'] || {}
                , def   = tipo['default']
                , type  = tipo['type']
            ;
            def = (typeof def == 'string'? def.toUpperCase() : def);

            // Monta valores
            switch (type){
                case 'int':
                    val = def || 0;
                    break;

                case 'float':
                case 'money':
                case 'percent':
                    val = def || '0,00';
                    break;

                case 'date':
                    if (def == 'NOW' || def == 'DATE' || def == 'HOJE'){
                        val = moment().format("DD/MM/YYYY");
                    }
                    break;

                case 'time':
                    if (def == 'NOW' || def == 'DATE' || def == 'HOJE'){
                        val = moment().format("HH:mm:ss");
                    }
                    break;

                case 'datetime':
                    if (def == 'NOW' || def == 'DATE' || def == 'HOJE'){
                        val = moment().format("DD/MM/YYYY HH:mm:ss");
                    }
                    break;

                default:
                    val = (def ? def : val);
            }

            row[f] = (val == 'NEW_KEY' ? '' : val);
        }

        // Pacote de retorno
        var data = getDataPack();
        data.rows.push(row);

        // Interrompe o processo e retorna row
        onDataFunc.call(this, data);
        return false;
    }

    // Retorna
    return true;
};

SQL.prototype._load = function(provider, req) {
    this.parseProvider(provider, req);
    return true;
};

/**
 * Processa o resultado do select ajustando o pacote de retorno.
 * @param results
 * @param sql
 */
SQL.prototype.processResults = function(results, sql){
    return this._processResults(results, sql);
};

/**
 * Processamento default de resultado de selects
 * @param results
 * @param sql
 * @private
 */
SQL.prototype._processResults = function(results, sql){
    var ndx         = {}
        , key       = this.obj.bizObj.source.metadata.key
        , onGetRow  = this.obj.bizObj['onGetRow']
        , db        = this
        , data      = getDataPack()
    ;

    // Processa
    results.forEach(function (row, i) {

        // Monta indice
        row._key_ = row[key];
        data.index[row._key_] = i;

        // Permite ajustar row no business object
        if (onGetRow) {
            onGetRow.call(db.obj.bizObj, row);
        }
        data.rows.push(row);
    });

    // Página
    data.page = this.sqlParams.limit.page +1;

    // ShowSQL
    if (this.sqlParams.showSQL) {
        data['sql'] = sql;
    }

    // Retorna
    return data;
};


//endregion


module.exports = SQL;
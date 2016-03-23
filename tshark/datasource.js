/**
 * Gateway para acesso a datasources.
 * @author labs
 * @since 10/03/2016
 * @param path { BizObject.path }
 * @param req
 * @param obj {BizObject} opcional
 * @constructor
 */
function Datasource(path, req, obj){

    /**
     * @type {BizObject.Path}
     */
    this.path = path;

    /**
     * @type TShark
     */
    this.tshark = req.app.get('tshark');

    /**
     * Recupera dados de conexão
     * @type {{tipo: string, conn: {host: string, port: string, user: string, pwd: string}}}
     */
    var c = this.tshark.getConnParams(this.path);

    /**
     * Instancia o DB de acordo com o driver
     */
    this.db = false;
    switch (c.tipo){
        case 'mysql':
            util.inherits(MySql, Db);
            this.db = new MySql(c, this.path, obj);
            break;

        case 'sqlserver':
            util.inherits(SqlServer, Db);
            this.db = new SqlServer(c, this.path, obj);
            break;

        default:
            throw 'Driver de dados não suportado: ' + c.tipo;
    }

    // Referencia ao objeto
    this.db.obj = obj;
}

//region :: Includes

const util      = require('util')
    , _         = require('underscore')
;

var Db          = require('./sql/_sql')
    , MySql     = require('./sql/mysql')
    , SqlServer = require('./sql/sqlserver')
;

//endregion


/**
 * Seleciona dados em um datasource
 * @param provider
 * @param req
 * @param onDataFunc { function(result) }
 * @param onErrorFunc { function(err, sql) }
 */
Datasource.prototype.select = function(provider, req, onDataFunc, onErrorFunc){
    this.db.select(provider, req, onDataFunc, onErrorFunc);
};

Datasource.prototype.load = function(provider, req){
    this.db.load(provider, req);
};


Datasource.prototype.insert = function(){

};

Datasource.prototype.update = function(){

};

Datasource.prototype.delete = function(){

};

Datasource.prototype.exec = function(){

};


// Exporta
module.exports = Datasource;
/**
 * Núcleo do TShark.
 * Implementa gateway de APIS e funções globais.
 * @author labs
 * @since 01/01/2016
 * @constructor
 */
function TShark(){
    this.router = router;
}


//region :: Includes

var router      = require('koa-router')()
    , BizObject = require('./biz_object.js')
;

const util      = require('util');

// endregion


// region :: Dados de conexões

/**
 * Verifica se os itens em path estão
 * hierarquicamente presentes em obj
 * @param obj {{}}
 * @param path {[]}
 */
function checkPath(obj, path){
    var o = obj;
    path.forEach(function(p){
        if(!o[p]){
            o[p] = {};
        }
        o = o[p];
    }, this);
}

/**
 * Recupera e armazena em cache a configuração de conexão de dados
 * de um objeto de negócio.
 * @param objPath {BizObject.Path}
 * @return {{ tipo: '', conn: { host: '', port: '', user: '', pwd: '' }}}
 */
TShark.prototype.getConnParams = function(objPath){

    return this.config.conexoes['default'];

    // TODO ajustar aqui

    /**
     * @type {{ tipo: '', conn: { host: '', port: '', user: '', pwd: '' }}}
     */
    var c  = false;
    var defConn = false
        , errObj  = 'Objeto de negócio não reconhecido: ' + objPath.asArray.join('::')
        , errConn = 'Conexão não configurada: %s'
    ;

    // Ajusta cache
    checkPath(this.config._map_, objPath.asArray);

    // Verifica se cache já existe
    if (!this.config._map_[objPath.owner][objPath.pack][objPath.obj]['conn']){

        // Localiza owner
        c = this.config.businessObjects[objPath.owner];
        if (!c){
            c = this.config.conexoes['default'];

        } else {
            defConn = c['conn'];

            // Localiza pack
            c = c[objPath.pack];
            if (!c) {
                c = this.config.conexoes['default'];
            } else {
                defConn = c['conn'] || defConn;

                // Localiza obj
                if (c.lenght > 0 && !c.indexOf(objPath.obj)) {
                    c = this.config.conexoes['default'];
                } else {

                    // Pega conexão
                    c = this.config.conexoes['default'];
                    if (!c) {
                        throw util.format(errCon, defConn);
                    }
                }
            }
        }

        // Cache
        this.config._map_[objPath.owner][objPath.pack][objPath.obj]['conn'] = c;

    } else {
        c = this.config._map_[objPath.owner][objPath.pack][objPath.obj]['conn'];
    }

    // Retorna
    return c;
};

// endregion

/**
 * Inicializa um Objeto de negócio
 * @param path
 * @param ctx
 */
TShark.prototype.initObj = function(path, ctx){

    // Business Object    
    var obj = require('./business_objects/' + path[0] + '/' + path[1] + '/' + path[2] + '/' + path[2] + '.js');
    
    // Extende
    util.inherits(obj, BizObject);
    
    // Ajusta
    var mod = new obj();
    mod['context'] = ctx || {};
    mod['path'] = {
        owner   : path[0],
        pack    : path[1],
        obj     : path[2],
        asArray : path,
        asString: path.join('/')
    };
    
    // Retorna
    return mod;
};


//region :: Roteamentos e entradas de APIs

/**
 * Log de chamadas
 */
router.use(function *timeLog(next) {
    console.log('Time: ', Date.now())

    // Ajusta call_path
    var path = this.captures[0].split('/');
    path.pop();
    path.shift();
    path.shift();

    this.app['call_path'] = path;
    yield next;
});

/**
 * Entrada de API list
 * @example /tshark/default/map/filiais/list
 * @since 21/02/16
 */
router.get(/^\/tshark\/(\w+)\/(\w+)\/(\w+)\/list$/, function *() {
    
    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod = this.app.tshark.initObj(this.app['call_path'], this); 

    /**
     * Gera a listagem
     * @type {{success, templates, data}|{success: boolean, templates: {list: *, fld: Array}, data: *[]}}
     */
    this.body = mod.list(this.request);

});


/**
 * Entrada de API search
 * @example /tshark/default/map/filiais/search
 * @sonce 14/03/16
 */
router.get(/^\/(\w+)\/(\w+)\/(\w+)\/search$/, function *() {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod = new BizObject(req);

    /**
     * Gera a listagem
     * @type {{success, templates, data}|{success: boolean, templates: {list: *, fld: Array}, data: *[]}}
     */
    req.query['template'] = '_no_template_';
    mod.list(req, res, next);

});


/**
 * Entrada de API form
 * 18/03/16
 */
router.get(/^\/(\w+)\/(\w+)\/(\w+)\/form$/, function *() {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod = new BizObject(req);

    /**
     * Gera a listagem
     * @type {{success, templates, data}|{success: boolean, templates: {list: *, fld: Array}, data: *[]}}
     */
    mod.form(req, res, next);

});

//endregion


//region :: Controle de erros
/*
router.use(function errorLog(err, req, res, next) {
    var r = {
        status: 500,
        error: err.message,
        stack: err.stack
    };
    console.error(r);

   // if (app.get('env') !== 'development') {
   //     r.stack = '';
  //  }

    res.send(r);
});


// catch 404 and forward to error handler
router.use(function (err, req, res, next) {
    var err = new Error('TSHARK Not Found');
    err.status = 404;
    next(err);
});

*/
//endregion


// Exporta
module.exports = TShark;
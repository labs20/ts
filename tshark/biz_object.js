/**
 * Wrapper para Objetos de Negócio.
 * Implementa entradas de APIS e funções globais para
 * objetos de negócio.
 * @author labs
 * @since 23/02/16.
 * @param req
 * @constructor
 */
function BizObject(path, ctx){

    /**
     * @type TShark
     */
    //this.tshark = req.app.get('tshark');

    /**
     * @type {{owner: '', pack: '', obj: '', asArray: [], asString: '}}
     *
    this.path = {
        owner   : path[0],
        pack    : path[1],
        obj     : path[2],
        asArray : path,
        asString: path.join('/')
    };

    /**
     * BusinessObject
     * @type { {
     *    id:'',
     *    source: {
     *        table: '',
     *        metadata: {
     *            key: 'map_clientes_key',
     *            fields: {}
     *        }
     *    },
     *    providers: {
     *
     *    }
     * } }
     *
    this.bizObj = new (
        require('./business_objects/' + this.path.asString + '/' + this.path.obj)
    )();

    // Chain
    return this;*/
}


//region :: Includes

const _         = require('underscore')
    , extend    = require('extend')

var Templates       = require('./templates')
    , Datasource    = require('./datasource')
    , base_path     = __dirname;

//endregion


// region :: Métodos internos

/**
 * Recupera uma conexão de dados
 * @param req
 * @return {Datasource}
 */
BizObject.prototype.getDataSource = function(req){
    return new Datasource(this.path, req, this);
};


/**
 * Retorna um objeto de resposta padrão
 * @param api
 * @returns {{status: number, success: boolean, callback: string, layout: {}, data: Array}}
 */
BizObject.prototype.getReturnObj = function (api){
    return {
        status: 200,
        success: true,
        callback: this.path.asArray.join(' ') + ' ' + api,
        layout: { },
        data: []
    };
};


/**
 * Retorna um provider
 * @param req
 * @returns {*}
 */
BizObject.prototype.getProvider = function (req){
    var provId = (
            req.query['provider'] && req.query['provider']['id']
                ? req.query['provider']['id']
                : 'default'
        )
        , prov = this.bizObj.providers[provId]
    ;
    prov.id = provId;
    return prov;
};


/**
 * Retorna um form
 * @param req
 * @returns {*}
 */
BizObject.prototype.getForm = function (req, provider){
    var formId = (
        req.query['form'] && req.query['form']['id']
            ? req.query['form']['id']
            : 'update'
    );
    var form = this.bizObj.forms[formId];
    if (!form) { return false; }

    //region :: Ajusta config

    form['_config']        = form['_config']        || {};
    form._config['bounds'] = form._config['bounds'] || { width: 800, height: 450 };
    form._config['labels'] = form._config['labels'] || types.form.lines.labels.ontop;
    form._config['comps']  = form._config['comps']  || types.form.lines.distribution.percent;
    form._config['state']  = form._config['state']  || types.form.state.loading;
    form._config['size']   = form._config['size']   || types.form.size.small;

    //endregion


    // region :: Ajusta Ctrls

    var meta = {};
    if (provider){
        for(var s in provider.sources){
            var src     = provider.sources[s]
                , mod   = this.getObjViaFrom(req, src.from)
            ;
            extend(true, meta, mod.bizObj.source.metadata);
        }
    } else {
        extend(true, meta, this.bizObj.source.metadata);
    }

    var self = this;
    form['ctrls'] = form['ctrls'] || {};
    form.linhas.forEach(function(linha){
        for(var ctrl in linha){

            // Pega o comp no meta e ajusta tipo
            var comp = (meta.fields[ctrl]
                ? extend(meta.fields[ctrl], meta.fields[ctrl]['tipo'])
                : {}
            );

            // Se o comp tá sobreescrito em ctrls
            if (form.ctrls[ctrl]){
                extend(true, comp, form.ctrls[ctrl]);
                if(form.ctrls[ctrl]['tipo']) {
                    extend(true, comp, form.ctrls[ctrl]['tipo'] || {});
                }
            }

            // Comp com dataset
            if (comp['data']){
                var mod = self.getObjViaFrom(req, comp['data']['from']);

                // Recupera provider
                var prov = mod.getProvider({
                    query: {
                        provider: {id: comp['data']['provider']}
                    }
                });

                // Recupera dados
                if (prov) {
                    var ds = mod.getDataSource(req);
                    var r = ds.load(prov, req);
                    comp.data['rows'] = r;
                }
            }

            // Entrega
            delete(comp['tipo']);
            form.ctrls[ctrl] = comp;
        }

    });

    // endregion

    return form;
};

BizObject.prototype.getObjViaFrom = function(req, from){

    var s_own = this.path.owner
        , s_pck = this.path.pack
        , s_tbl
    ;

    switch (from.length) {
        case 1:
            s_tbl = from[0];
            break;

        case 2:
            s_pck = from[0];
            s_tbl = from[1];
            break;

        case 3:
            s_own = from[0];
            s_pck = from[1];
            s_tbl = from[2];
            break;

        default:
            throw 'Source em formato invalido no provider';
    }

    // Recupera
    req.params['_path'] = [s_own, s_pck, s_tbl];
    var mod = new (require('./biz_object.js'))(req);

    // Retorna
    return mod;
};


// endregion


// region :: APIs


/**
 * Implementa API list / search em módulos
 * @param req
 * @param res
 * @param next
 * @returns {{success: boolean, templates: {list: *, fld: Array}, data: *[]}}
 */
BizObject.prototype.list = function(req) {

    // Objeto de retorno:
    var ret = this.getReturnObj('list');

    // Recupera template
    ret.template = req.query['template'] || 'list';
    if (!req['_no_template_']) {
        var templ = new Templates(this.path, this.tshark);
        templ.render(ret.template, req);

        // Template
        ret.layout[ret.template] = templ.template;

        // Fields em template
        req.params._fields = templ.fields;
    }

    // Recupera provider
    var provider = this.getProvider(req);
    if (!provider) { return next({message: "Provider não encontrado."}); }

    // Recupera dados
    var ds = this.getDataSource(req);
    ds.select(provider, req,

        // Retorna
        function(result){
            ret.data = result;
            res.send(ret);
        },

        // Erro
        function (err, sql) {
            next({
                message: err.code + ' - ' + err.message,
                stack: 'SQL: \n' + sql
            });
        }

    );
};


/**
 * Implementa API de forms para objetos de negócio
 * @param req
 * @param res
 * @param next
 */
BizObject.prototype.form = function(req, res, next){

    // Objeto de retorno:
    var ret = this.getReturnObj(req, 'form');
    ret.form = req.query['form'] || {};
    ret.form.key = ret.form['key'] || 'NEW_KEY';
    ret.form.field = ret.form['field'] || this.bizObj.source.metadata.key;

    // Ajusta o key do form
    req.query[ret.form.field] = ret.form.key;

    // Recupera provider
    var provider = this.getProvider(req);

    // Recupera o form
    ret.layout = this.getForm(req, provider);
    if (!ret.layout) { return next({message: "Form não encontrado."}); }

    // Fields em form
    req.params._fields = [];
    ret.layout.linhas.forEach(function(linha){
        for (var f in linha) {
            req.params._fields.push(f);
        }
    });

    // Recupera dados
    var ds = this.getDataSource(req);
    ds.select(provider, req,

        // Retorna
        function(result){
            ret.data = result;
            res.send(ret);
        },

        // Erro
        function (err, sql) {
            next({
                message: err.code + ' - ' + err.message,
                stack: 'SQL: \n' + sql
            });
        }

    );

};

// endregion



// Exporta
module.exports = BizObject;
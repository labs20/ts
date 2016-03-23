/**
 * Aplicação TShark v3
 * @link <a href='http://koajs.com/'>Koa</a>
 * @link <a href='https://github.com/alexmingoia/koa-router'>koa-router</a>
 * @link <a href='https://github.com/chrisyip/koa-jade'>koa-jade</a>
 * @link <a href='https://github.com/pkoretic/koa-static-server'>koa-static-server</a>
 * @link <a href='https://github.com/LeanKit-Labs/seriate'>Seriate</a>
 * @link <a href='http://underscorejs.org/'>Undescore</a>
 * @link <a href='https://www.npmjs.com/package/extend'>extend</a>
 * @author Labs
 * @since 22/03/2016
 */
var serve       = require('koa-static-server')
    , koaBody   = require('koa-body')
    , app       = require('koa')()
;

app.use(koaBody({formidable:{uploadDir: './app/tmp'}}));

/**
 * Arquivos estáticos
 */
app.use(serve({rootDir: './app/client'}));


/**
 * Configurações gerais da aplicação
 * @type {*|exports|module.exports}
 */
app.config = require('./config');


/**
 * Jade
 */
const Jade = require('koa-jade');
const jade = new Jade({
    viewPath: './app/views',
    debug: false,
    pretty: false,
    compileDebug: false,
    locals: app.config,
    //basedir: 'path/for/jade/extends',
    /*helperPath: [
        'path/to/jade/helpers',
        { random: 'path/to/lib/random.js' },
        { _: require('lodash') }
    ],*/
    app: app // equals to jade.use(app) and app.use(jade.middleware)
});

/**
 * Roteamento da aplicação
 * @type {SQL|exports|module.exports}
 */
var router = require('./app/routes');
app.use(router.routes());


// region :: TShark


// Inicializa
app.tshark = new (require('./tshark/tshark'))(app.config);

// Roteamento
app.use(app.tshark.router.routes());


//endregion


// Http server
app.listen(app.config.info.port);
console.log('running...');
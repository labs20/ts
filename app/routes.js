/**
 * Roteamentos da aplicação
 */
var router = require('koa-router')();


// Home page
router.get('/', function *(next) {
    var menu   = require('./menu');
    this.render('index', {
        menu: menu
    }, true);
});


// Retorna o menu principal
router.get('/app/menu', function *(next) {
    var menu = require('./menu');
    this.body = menu;
});


module.exports = router;

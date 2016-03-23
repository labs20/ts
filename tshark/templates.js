/**
 * Mecanismo de templates.
 * Implementa pesquisa, recuperação e parse de templates.
 * @author labs
 * @since 16/03/16.
 * @returns {Templates}
 * @constructor
 */
function Templates(){

    /**
     * Template renderizada
     * @type {string}
     */
    this.template = "";

    /**
     * Fields identificados em um template
     * @type {Array}
     */
    this.fields = [];

    // Chain
    return this;
}


/**
 * Renderiza e retorna um template, efetuando busca local ao app
 * e pegando default caso necessário.
 * @param templId Id da template
 * @param req
 * @returns templ
 */
Templates.prototype.render = function(templId, path, app){
    var templ = ''
        , site_path     = req.app.get('site_views') + '/' + this.path.asString
        , tshark_path   = req.app.get('site_views') + '/' + this.path.asString
        , f             = templId + '.jade'
        , old_views     = req.app.get('views')
    ;

    // Tenta encontrar em views padrão
    req.app.set('views', old_views + '/modulos/' + this.path.asString);
    req.app.render(f, function(err, html){
        templ = html;

        // Se não encontrar, tenta em public
        if (err) {
            req.app.set('views', site_path);
            req.app.render(f, function (err, html){
                templ = html;

                // Se não encontrar, pega no business_object
                if (err) {
                    req.app.set('views', tshark_path);
                    req.app.render(f, function (err, html) {
                        templ = html;
                    });
                }

            });
        }

        req.app.set('views', old_views);
    });

    // Reseta
    this.template = templ;
    this.fields = this.parseFields(templ);

    // Retorna
    return templ;
};


/**
 * Recebe um template e processa o conteúdo extraindo 'row.[field]'
 * dele e retornando em um array
 * @param templ { string } Template a ser pesquisado
 * @param re { regex } Regular expression de tag (opcional, default para /row\.(\w+)/g
 * @returns {Array}
 */
Templates.prototype.parseFields = function(templ, re){
    if (!templ) return [];

    var tmp = templ.match(re || /row\.(\w+)/g)
        , fields = []
    ;

    if (tmp != null){
        fields = tmp.map(function(f){
            return f.split('.')[1];
        });
    }

    return fields;
};


// Exporta
module.exports = Templates;
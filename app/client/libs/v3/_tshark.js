/**
 * TShark - Client 3.0
 *  Implementação de client baseado em Semantic UI.
 *
 * @copyright [== © 2015, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 06/10/2015
 */
function TShark(){
    this.clickevent = 'click';

    // Módulos
    this._tmp_ = {};
    this.modulos = {};
    this.modulos._add = function(id, mod){
        tshark._tmp_[id] = mod;
    };

    /**
     * Mapa de verbos da Api
     */
    this.api_map = {
        list    : ['GET',       '/list'],         // ok
        get     : ['GET',       '/get/{id}'],
        search  : ['GET',       '/search'],       // ok
        //create  : ['GET',       '/create'],
        //edit    : ['GET',       '/edit'],
        form    : ['GET',       '/form'],         // on
        insert  : ['POST',      '/insert'],
        update  : ['PUT',       '/update/{id}'],
        delete  : ['DELETE',    '/delete/{id}'],
        exec    : ['POST',      '/exec/{id}']
    };

}

// Globals
var CONSOLE_ON = true;

/**
 * Reseta apis Semantic
 */
$.fn.api.settings.api = {};

/**
 * Implementação da classe
 */
(function() {


    //region :: Inicialização

    /**
     * Inicializa o TShark client realizando os binds iniciais
     * @since 06/10/15
     */
    TShark.prototype.init = function (options) {
        this.bind();
    };

    /**
     * Ativa o semantic em ref
     * @since 06/10/15
     */
    TShark.prototype.bind = function (ref) {
        if (!ref) {
            ref = 'body';

        } else {
            if (typeof ref == 'string') {
                ref = (ref ? ref + ' ' : '');
                if (ref && (ref[0] != '#' && ref[0] != '.')) {
                    ref = "#" + ref;
                }

                ref = $(ref);
            }
        }

        // Bind de APIs
        $(ref).find('[data-action]').not('.api-binded')
            .api(this.api)
            .addClass('api-binded');

        // Bind Semantic
        $(ref).find('.ui.dropdown').not('.binded')
            .dropdown()
            .addClass('binded')
        ;

        $(ref).find('.ui.checkbox').not('.binded')
            .checkbox()
            .addClass('binded')
        ;

        $(ref).find('.ui.accordion').not('.binded')
            .accordion()
            .addClass('binded')
        ;

        $(ref).find('.ui.sticky').not('.binded')
            .sticky({
                offset: 90,
                bottomOffset: 5
            })
            .addClass('binded')
        ;

        $(ref).find('.special.cards .image').not('.binded')
            .addClass('binded')
            .dimmer({
                on: 'hover'
            })
        ;
    };

    /**
     * Remove links de api
     * @since 06/10/15
     */
    TShark.prototype.unbind = function (ref) {
        if (!ref) {
            ref = 'body';

        } else {
            if (typeof ref == 'string') {
                ref = (ref ? ref + ' ' : '');
                if (ref && (ref[0] != '#' && ref[0] != '.')) {
                    ref = "#" + ref;
                }
                ref = $(ref);
            }
        }

        $(ref).find('.binded')
            .removeClass('binded numpader-binded')
        ;
    };

    //endregion


    //region :: Módulos

    /**
     * Normaliza uma API para ser sempre array
     * @param api
     * @returns {[]}
     */
    function normalizeAPI(api) {

        // Garante array para API
        switch (typeof api) {
            case 'string':
                api = api.split('.');
                break;

            case 'object':
                api = [api[0], api[1], api[2]];
                break;
        }

        return api;
    }

    /**
     * Recupera um módulo, pelo seu id
     * @param id { 'owner.pack.mod' }
     * @returns { TShark.modulo }
     */
    TShark.prototype.getMod = function (id) {
        return this.modulos[id];
    };

    /**
     * Verifica se um módulo está registrado.
     * @param id
     * @returns {boolean}
     */
    TShark.prototype.isRegistered = function (id) {
        return (this.modulos[id] ? true : false);
    };

    /**
     * Registra um módulo
     * @param id { 'owner.pack.mod' }
     * @param callFunc { function() } Função que será executada após a carga do módulo
     * @since 21/02/16
     */
    TShark.prototype.register = function (id, callFunc) {

        // Ajusta path
        var mod = this.modulos[id];

        // Recupera módulo e instancía
        if (!mod || !mod['data']) {

            // Recupera modulo
            var arq = "/modulos/" + id + ".js";
            $.getScript(arq)

                // Achou
                .done(function (data, textStatus) {

                    // Cria instância e merge com recebido
                    tshark.modulos[id] = tshark.initMod(id);

                    // Chama função callback
                    if (callFunc) {
                        callFunc.apply();
                    }
                })

                // Falhou
                .fail(function (jqxhr, settings, exception) {
                    //alertify.error("API não reconhecida: '" + map + "'");
                })
            ;
        }
    };

    /**
     * Instancia e extende um novo módulo
     * @param ref { TShark.modulo }
     */
    TShark.prototype.initMod = function (ref) {
        var path = '';

        if (typeof ref == 'string') {
            path = ref;
            ref = tshark._tmp_[ref];
            delete(tshark._tmp_[ref]);
        }

        // Extends definido no módulo
        var extra_extend = (ref && ref.extends && window[ref.extends] ? window[ref.extends] : {});

        // Cria com hierarquia
        var mod = $.extend(

            // Módulo TShark
            new tshark.modulo(path),

            // Objeto definido no módulo, se houver
            extra_extend,

            // BizObject
            ref || {}
        );

        if (mod['init']) {
            mod.init();
        }

        // Retorna
        return mod;
    };


    //endregion


    //region :: APIs

    /**
     * Eventos de controle de chamadas de Api
     * Exceto onde notado, o contexto de 'this' é o objeto de
     * chamada da API
     * @since 06/10/15
     */
    TShark.prototype.api = {

        /**
         * Ajusta a API dinamicamente.
         * Contexo 'this': elemento DOM originador da chamada
         */
        beforeSend: function (settings) {
            var d = $.extend({}, $(this).data() || {});

            // Ajusta API
            var api   = d.action.split(' ')
                , map = api.shift()
                , id  = api.join('.')
                , el  = this
            ;

            if (!tshark.api_map[map]) {
                alertify.error("API não reconhecida: '" + map + "'");
            }

            // Registra modulo
            if (!tshark.isRegistered(id)) {
                tshark.register(id, function () {
                    $(el).api('query');
                });
                return false;
            }

            // Executa onBefore
            var Func = map.capitalize()
                , mod = tshark.getMod(id)
            ;

            // Interno
            if (tshark[map + '_before']) {
                tshark[map + '_before'].call(mod, el, settings);
            }

            // Externo
            if (mod['onBefore' + Func] && !settings['_on_before_']) {
                if (!mod['onBefore' + Func].call(mod, el, settings)) return false;
            }

            // Ajusta template
            if (settings['template'] && mod.templates[settings['template']]){
                settings['_no_template_'] = true;
            }

            // Ajusta dados
            delete(d['moduleApi']);
            delete(d['action']);
            settings.data = $.extend(settings.data, d);

            // Ajusta settings
            settings.url = 'tshark/' + api.join('/') + tshark.api_map[map][1];
            settings.method = method = tshark.api_map[map][0];
            settings['_on_before_'] = false;

            // Retorna
            return settings;
        },

        /**
         * Ajusta callback
         */
        onSuccess: function (response) {
            // valid response and response.success = true
            tshark.callback(response);
        },

        onResponse: function (response) {
            // make some adjustments to response
            return response;
        },
        successTest: function (response) {
            // test whether a json response is valid
            return response && response.success;
        },
        onComplete: function (response) {
            // always called after xhr complete
        },

        /**
         * Erro no server
         */
        onFailure: function (response) {
            if (response) {
                if (response['error']) alertify.error(response.error);
                if (console && response['stack']) {
                    console.error(response.error);
                    console.error(response.stack);
                }
            }
        },

        /**
         * Erro no server
         */
        onError: function (errorMessage) {
            alertify.error(errorMessage);
            if (console) {
                console.error(errorMessage);
            }
        },

        /**
         * Erro no server
         */
        onAbort: function (errorMessage) {
            alertify.error(errorMessage);
            if (console) {
                console.error(errorMessage);
            }
        }
    };

    /**
     * Gateway para processamento de retornos de API
     * @since 06/10/15
     */
    TShark.prototype.callback = function (response) {
        try {
            var api = response.callback.split(' ')
                , func = api.pop()
                , Func = func.capitalize()
                , id   = api.join('.')
                , mod  = this.getMod(id)
                , overwrite = false
            ;
            if (mod && func) {

                // Before / Overwrite
                if (mod['on' + Func]) {
                    mod['on' + Func].call(mod, response, function () {
                        tshark[func + '_callback'].call(tshark, mod, response);
                    });

                // Default
                } else {
                    this[func + '_callback'].call(this, mod, response);
                }

                // After
                if (mod['onAfter' + Func]) {
                    mod['onAfter' + Func].call(mod, response);
                }
            }

        } catch (e) {
            console.error(e.stack);
        }
    };


    /**
     * onBefore: Chamado antes de descer ao server
     *  - this é o módulo da operação.
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    TShark.prototype.list_before = function(sender, settings){

        // Seta template default
        settings.data['template'] = 'list';

    };

    /**
     * Callback de listagem de dados
     * @param mod { TShark.modulo }
     * @param response
     * @since 06/10/15
     */
    TShark.prototype.list_callback = function (mod, response) {

        if (response['layout']) {
            mod.templates = $.extend(mod.templates, response.layout);
        }

        if (response['data']) {
            mod.data = response['data'];

            // ShowSQL
            if (response['data']['sql']){
                console.log('List:' + response['data']['sql'])
            }
        }


    };


    /**
     * onBefore: Garante a presença do valor de pesquisa em query.
     * O valor é recuperado com base no id de componente de pesquisa armazenado
     * em data-comp de sender, ou se não houver a propriedade, pega o valor em sender.
     * Ex: input#my_search
     *     button(rv-data-action='api.search', data-comp='#my_search')
     * @since 15/03/16
     */
    TShark.prototype.search_before = function (sender, settings) {
        var id = $(sender).data('comp');
        settings.data['query'] = (id && $(id)
            ? $(id).val()
            : $(sender).val()
        );
    };

    /**
     * Callback de search
     * @param mod { TShark.modulo }
     * @param response
     * @since 15/03/16
     */
    TShark.prototype.search_callback = function (mod, response) {
        if (response['data']) {
            mod.data = response['data'];

            // ShowSQL
            if (response['data']['sql']){
                console.log('Search:' + response['data']['sql'])
            }
        }
    };


    /**
     * onBefore: Verifica se sender possui data-key. Se sim, ele é recuperado
     * e o form será populado com o registro equivalente (pré update).
     * Se não, o form é recuperado vazio (pré insert)
     *
     * Ex: .row(rv-data-action='api.form', rv-data-key='row.clientes_key')
     *     .button(data-action='api-form')
     * @since 18/03/16
     */
    TShark.prototype.form_before = function (sender, settings) {
        settings.data['form'] = {
            key: $(sender).data('key')
        };
    };

    /**
     * Exibe mensagens vindas do server
     * @param mod { TShark.modulo }
     * @param response
     * @since 19/03/16
     */
    TShark.prototype.form_callback = function (mod, response) {
        if (response['data']){
            mod.setRow(response.form.key, response['data'].rows[0]);
        }

        if (response['layout']){
            mod.createForm(response.layout)
        }
    };



    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.showMessage_callback = function (params) {
        var msg = params.mensagem;

        switch (msg.tipo) {
            case 0:
                alertify.alert("Erro interno", msg.desc);
                console.log(msg.msg);
                console.log(msg.desc);
                break;

            case 1:
                alertify.error(msg.msg, msg.desc);
                console.log(msg.msg);
                console.log(msg.desc);
                break;

            case 2:
                alertify.alert(msg.msg, msg.desc);
                console.log(msg.msg);
                console.log(msg.desc);
                break;

            default:
                alertify.notify(msg.msg, msg.desc);
                break;
        }

    };


    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.get_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.create_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.insert_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.update_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.delete_callback = function (params) {
    };

    //endregion


})($);

/**
 * TShark - Client 3.0
 *  Implementação de client dataset.
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 20/02/2016
 */
TShark.prototype.modulo = function(path){

    /**
     * Armazena this para ser usado em funções internas
     * @type {TShark}
     */
    var self = this;

    /**
     * Permite extender uma classe
     */
    this.extends = '';

    /**
     * Path domodulo
     * @type {*|string}
     */
    this.path = path || '';

    /**
     * Função de init, implementada em overwrite em modulos filhos
     */
    this.init = function(){

    };


    // Monta helper para usar APIs em design com rv
    this.api = {};
    var api = this.path.replace(/\./g, ' ');
    for (var a in tshark.api_map){
        this.api[a] = a + ' ' + api;
    }

    /**
     * Info do módulo
     * @type {{titulo: string, info: string, help: string, icon: string}}
     */
    this.info = {
        titulo: '',
        info: '',
        help: '',
        icon: ''
    };

    /**
     * Dataset do modulo
     * @type {{key: string, index: {}, rows: Array, page: number}}
     */
    this.data = {

        /**
         * Nome do campo de chave
         * @type {string}
         */
        key: '',

        /**
         * Indice de rows por chave
         * @type {{}}
         */
        index: {},

        /**
         * Rows do dataset
         * @type {Array}
         */
        rows: [],

        /**
         * Row definida em navegação
         */
        row: {},

        /**
         * Página atual no server
         * @type {number}
         */
        page: -1

    };

    /**
     * Templates do módulo
     * @type {{templ_name:''}}
     */
    this.templates = {};

    /**
     * Form para edição
     */
    this.form = {
        bounds: {},
        html: ""
    };
};


/**
 * Implementação da classe
 */
(function() {


    //region :: Dataset

    /**
     * Limpa tudo
     */
    TShark.prototype.modulo.prototype.clear = function () {
        this.data = {rows: [], page: -1};
    };


    /**
     * Carrega dados diretamente de uma API
     */
    TShark.prototype.modulo.prototype.load = function (load_api) {
        load_api = load_api || this.path.split('.');
        if (typeof load_api == 'string') {
            load_api = load_api.split(' ');
        }

        // Executa chamada
        var self = this;
        $.ajax(load_api.join("/"), {})

            // Processa retorno
            .done(function (data) {
                if (self['onLoad']) {
                    self.onLoad(data);
                }

                self.data.rows = data.rows;
                self.data.page = data.page;
                tshark.bind();

                if (self['onAfterLoad']) {
                    self.onAfterLoad();
                }
            });
    };


    /**
     * Retorna um row com base em valor de chave
     * @param key valor da chave do row desejado
     * @returns {*}
     */
    TShark.prototype.modulo.prototype.getRow = function(key){
        var ndx = this.data.index[key];
        return this.data.rows[ndx];
    };

    /**
     * Retorna um row com base em sua posição no array de rows
     * @param index indice no array de rows
     * @returns {*}
     */
    TShark.prototype.modulo.prototype.getRowAt = function(index){
        return this.data.rows[index];
    };

    /**
     * Atualiza ou cria um novo row, tendo a chave como referencia
     * @param key
     * @param row
     */
    TShark.prototype.modulo.prototype.setRow = function(key, row){
        var ndx = this.data.index[key];
        if (ndx || ndx == 0) {
            $.extend(this.data.rows[ndx], row);
        } else{
            ndx = this.data.rows.length;
            this.data.index[key + '_' + ndx] = ndx;
            this.data.rows.push(row);
        }
        this.data.row = this.data.rows[ndx];
    };

    //endregion


    //region :: Forms


    /**
     * Limpa tudo
     */
    TShark.prototype.modulo.prototype.createForm = function (layout) {

        var f_config    = layout['_config'] || {}
            , widths    = {
                 1: 'one',       2: 'two',       3: 'three',     4: 'four',
                 5: 'five',      6: 'six',       7: 'seven',     8: 'eight',
                 9: 'nine',     10: 'ten',      11: 'eleven',   12: 'twelve',
                13: 'thirteen', 14: 'fourteen', 15: 'fiveteen', 16: 'sixteen'
            }

            // Configurações do form
            , form = $("<div>", {
                class: "ui " + f_config['size']  + " "
                             + f_config['comps'] + " "
                             + f_config['state'] + " "
                     + " form "
            })
        ;

        // Processa as linhas
        layout.linhas.forEach(function(l){
            var l_config = {};
            if (l['_config']){
                l_config = $.extend(l_config, l['_config']);
                delete(l['_config']);
            }
            var config      = $.extend({}, f_config, l_config)
                , inline    = config['labels']
                , width     = config['comps']
            ;

            // Processa os comps em uma linha
            var linha = $("<div>", {class: inline + " fields", style: 'white-space: nowrap;'});
            for (var f in l){

                // Título
                if (f == 'titulo' || f == 'icon'){
                    if (f == 'icon') continue;

                    var icon = (l['icon'] ? '<i class="' + l['icon'] + ' icon"></i>': '');
                    form.append($("<h4>", {class: "ui dividing header"}).html(icon + l[f]));

                // Componentes
                } else {
                    var ctrl = layout.ctrls[f]
                        , f_class = (width == 'percent' ? widths[Math.round(16 * (l[f] / 100))] + " wide " : " ")
                    ;

                    // Área do comp
                    var field = $("<div>", {
                        class: f_class + " field "
                    });

                    if (ctrl['label']) {
                        var icon = (ctrl['icon'] ? '<i class="' + ctrl['icon'] + ' icon"></i>': '');
                        field.append(
                            $("<label>", {'title': ctrl['help']})
                                .html(icon + ' ' + ctrl['label'])
                        );
                    }

                    // Processa um comp
                    field.append(getComp(ctrl, f));

                    linha.append(field);
                }
            }
            form.append(linha);
        });

        this.form.html = form;

    };

    function getComp(ctrl, field){

        var tag       = 'input'
            , params  = {type: "text", class: "", 'rv-value': "data.row." + field}
            , c_class = ''
            , extra_left   = ''
            , extra_right  = ''
        ;
        switch (ctrl['comp']){

            case 'inpInt':
                params.type = 'number';
                params.step = 1;
                break;

            case 'inpFloat':
            case 'inpMoney':
            case 'inpPercent':
                params.type = 'number';
                params.step = 0.01;
                break;

            case 'inpMemo':
                params.rows = 6;
            case 'inpMemoShort':
                params.rows = params.rows || 2;
            case 'inpMemoLong':
                tag = 'textarea'
                params.rows = params.rows || 12;
                params.type = '';
                break;

            case 'inpCheckBox':
            case 'inpSlider':
            case 'inpToggle':
            case 'inpRadio':
                break;

            case 'inpDropdown':
            case 'inpList':
            case 'inpChoose':
                break;

            case 'inpDate':
                params.type = 'date';
                break;

            case 'inpTime':
                params.type = 'time';
                break;

            case 'inpDateTime':
                params.type = 'datetime-local';
                break;
        }

        // Disabled?
        c_class += ctrl['state'] + ' ';
        params[ctrl['state']] = "on";

        // Transparent?
        if (ctrl['transparent']){
            c_class += ' transparent ';
        }

        // Size?
        if (ctrl['size']){
            c_class += ' size ';
        }

        // Extra left?
        if (ctrl['extra_left']){
            c_class += ctrl['extra_left']['class'] + ' ';
            extra_left = ctrl['extra_left']['tag'];
        }

        // Extra right?
        if (ctrl['extra_right']){
            c_class += ctrl['extra_right']['class'] + ' ';
            extra_right = ctrl['extra_right']['tag'];
        }


        var area = $("<div>", {class: "ui " + c_class + ' ' + tag});
        if (extra_left){
            $(area).append(extra_left);
        }

        params.title = ctrl['help'];
        params.placeholder = ctrl['hint'];

        $(area).append($("<" + tag + ">", params));

        if (extra_right){
            $(area).append(extra_right);
        }

        return area;
    }


    //endregion

})($);

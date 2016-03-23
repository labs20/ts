/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Filiais(){


    //region :: Definições do Objeto

    // Id
    this.id = 'filiais';

    // Map
    this.source = {
        table: 'map_filiais',
        metadata: {
            key: 'map_filiais_key',
            fields: {
                map_filiais_key: {
                    tipo: types.comp.key, label: 'Código:'
                },
                bplid: {
                    tipo: types.comp.text, label: 'Nome no PDV:'
                },
                whscode: {
                    tipo: types.comp.datetime, label: 'Depósito Padrão:'
                },
                listnum: {
                    tipo: types.comp.text, label: 'Lista de Preço Padrão:'
                },
                cardcode: {
                    tipo: types.comp.text, label: 'Parceiro de Negócio Associado:'
                },
                ext_filial_id: {
                    tipo: types.comp.text, label: 'Identificação da Filial em PDVs:'
                },
                observacoes:{
                    tipo: types.comp.text_big, label: 'Observações:'
                }
            }
        }
    };

    //endregion


    //region :: Forms

    this.forms = {

        // Form de update
        /*
        TODO: tabs, accordion

         */
        update:{
            _config: {
                bounds: { width: 800, height: 450 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small
            },
            linhas: [
                {titulo: "Dados do cliente"},
                {cardcode: 40, cardname: 60, _config: { labels: types.form.lines.labels.inline } },
                {map_filiais_key: 50, bplid: 20, bplname: 30 },

                {titulo: "Observações", icon: "big calendar"},
                {whscode: 20, whsname: 80}
            ],
            ctrls: {
                cardcode: { label: 'Clientes:', comp: 'inpDate', icon: "calendar", hint: 'Escolha a data' },
                cardname: {
                    label: '',
                    state: types.ctrls.state.readonly,
                    extra_left:{
                        class: 'labeled',
                        tag: '<div class="ui label">http://</div>'
                    }
                },
                bplid: {
                    extra_right: {
                        class: 'right labeled',
                        tag: '<a class="ui tag label">Add tag</a>'
                    }
                },
                whscode: {
                    tipo: types.comp.dropdown,
                    data: {
                        from: ['sap', 'simples', 'depositos'],
                        provider: '',
                        key: ['whscode'],
                        value: ['whscode', ' :: ', 'whsname']
                    }
                },
                whsname: { tipo: types.comp.text_huge }
            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['map', 'filiais']
                },
                '1': {
                    from: ['sap', 'simples', 'filiais'],
                    join: {source: '0', tipo: types.join.left, on: 'bplid', where: ''},
                    fields: ['bplname']
                },
                '2': {
                    from: ['sap', 'simples', 'pns'],
                    join: {source: '0', tipo: types.join.left, on: 'cardcode', where: ''},
                    fields: ['cardname']
                },
                '3': {
                    from: ['sap', 'simples', 'depositos'],
                    join: {source: '0', tipo: types.join.left, on: 'whscode', where: ''},
                    fields: []
                },
                '4': {
                    from: ['sap', 'simples', 'listas'],
                    join: {source: '0', tipo: types.join.left, on: 'listnum', where: ''},
                    fields: []
                }
            },
            where: [
                ["AND", '0', "map_filiais_key", types.where.check]
            ],
            search: [
                {alias: '3', field: 'whscode',  param: types.search.like },
                {alias: '2', field: 'cardcode', param: types.search.in },
                {alias: '1', field: 'bplname',  param: types.search.like },
                {alias: '4', field: 'listnum',  param: types.search.menor },
                {alias: '4', field: 'listnum',  param: types.search.maior_igual }
            ],
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos

    /**
     * Evento chamado para cada row em select
     * @param row
     */
    this.onGetRow = function(row){
        row['teste'] = 123;
    };

    //endregion

}



// Types
const types = require('../../../../types');

// Exporta
module.exports = Filiais;
/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Clientes(){

    // Id
    this.id = 'clientes';

    // Map
    this.source = {
        table: 'map_clientes',
        metadata: {
            key: 'map_clientes_key',
            fields: {
                map_clientes_key: {
                    tipo: types.comp.key, label: 'Código:'
                },
                map_filiais_key: {
                    tipo: types.comp.int, label: 'Filial:'
                },
                ext_cliente_id: {
                    tipo: types.comp.text, label: 'Identificação no PDV:'
                },
                ext_nome: {
                    tipo: types.comp.text, label: 'Nome no PDV:'
                },
                cardcode: {
                    tipo: types.comp.text, label: 'Cliente Mapeado:'
                }
            }
        }
    };

    // Providers
    this.providers = {

        default: {
            sources: {
                '1': {
                    from: ['map', 'clientes']
                },
                '2': {
                    from: ['map', 'filiais'],
                    join: {source: 1, tipo: types.join.inner, on: 'map_filiais_key', where: ''},
                    fields: []
                }
            },
            where: [
                ["AND", 1, "map_clientes_key", types.where.check],
            ],
            limit: 250,
            showSQL: true
        }

    };
}

// Tipos
const types = require('../../../../types');

// Exporta
module.exports = Clientes;
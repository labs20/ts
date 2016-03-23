/**
 * Created by labs on 20/02/16.
 */

/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Listas() {

    // Id
    this.id = 'listas';

    // Map
    this.source = {
        table: 'opln',
        metadata: {
            key: 'listnum',
            fields: {
                listnum: {
                    tipo: types.comp.int, label: "Listnum:"
                },
                listname: {
                    tipo: types.comp.text, label: "Listname:"
                },
                base_num: {
                    tipo: types.comp.int, label: "Base Num:"
                },
                factor: {
                    tipo: types.comp.float, label: "Factor:"
                },
                roundsys: {
                    tipo: types.comp.int, label: "Roundsys:"
                },
                groupcode: {
                    tipo: types.comp.int, label: "Groupcode:"
                },
                datasource: {
                    tipo: types.comp.text, label: "Datasource:"
                },
                sppcounter: {
                    tipo: types.comp.int, label: "Sppcounter:"
                },
                usersign: {
                    tipo: types.comp.int, label: "Usersign:"
                },
                isgrossprc: {
                    tipo: types.comp.text, label: "Isgrossprc:"
                },
                loginstanc: {
                    tipo: types.comp.int, label: "Loginstanc:"
                },
                usersign2: {
                    tipo: types.comp.int, label: "Usersign2:"
                },
                updatedate: {
                    tipo: types.comp.datetime, label: "Updatedate:"
                },
                validfor: {
                    tipo: types.comp.text, label: "Validfor:"
                },
                validfrom: {
                    tipo: types.comp.datetime, label: "Validfrom:"
                },
                validto: {
                    tipo: types.comp.datetime, label: "Validto:"
                },
                createdate: {
                    tipo: types.comp.datetime, label: "Createdate:"
                },
                primcurr: {
                    tipo: types.comp.text, label: "Primcurr:"
                },
                addcurr1: {
                    tipo: types.comp.text, label: "Addcurr1:"
                },
                addcurr2: {
                    tipo: types.comp.text, label: "Addcurr2:"
                },
                roundrule: {
                    tipo: types.comp.text, label: "Roundrule:"
                },
                extamount: {
                    tipo: types.comp.float, label: "Extamount:"
                },
                rndfrmtint: {
                    tipo: types.comp.text, label: "Rndfrmtint:"
                },
                rndfrmtdec: {
                    tipo: types.comp.text, label: "Rndfrmtdec:"
                }
            }
        }
    };

    // Providers
    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['sap', 'simples', 'listas']
                }
            },
            where: [
                ["AND", '0', "listnum", types.where.check]
            ]
        }

    };
}

// Types
const types = require('../../../../types');

// Exporta
module.exports = Listas;
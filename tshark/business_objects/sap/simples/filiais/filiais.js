/**
 * Created by labs on 20/02/16.
 */

/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Filiais(){

    // Id
    this.id = 'filiais';

    // Map
    this.source = {
        table: 'obpl',
        metadata: {
            key: 'bplid',
            fields: {
                bplid: {
                    tipo: types.comp.int, label: "Bplid:"
                },
                bplname: {
                    tipo: types.comp.text, label: "Bplname:"
                },
                bplfrname: {
                    tipo: types.comp.text, label: "Bplfrname:"
                },
                vatregnum: {
                    tipo: types.comp.text, label: "Vatregnum:"
                },
                repname: {
                    tipo: types.comp.text, label: "Repname:"
                },
                industry: {
                    tipo: types.comp.text, label: "Industry:"
                },
                business: {
                    tipo: types.comp.text, label: "Business:"
                },
                address: {
                    tipo: types.comp.text, label: "Address:"
                },
                addressfr: {
                    tipo: types.comp.text, label: "Addressfr:"
                },
                mainbpl: {
                    tipo: types.comp.text, label: "Mainbpl:"
                },
                txoffcno: {
                    tipo: types.comp.text, label: "Txoffcno:"
                },
                disabled: {
                    tipo: types.comp.text, label: "Disabled:"
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
                dflcust: {
                    tipo: types.comp.text, label: "Dflcust:"
                },
                dflvendor: {
                    tipo: types.comp.text, label: "Dflvendor:"
                },
                dflwhs: {
                    tipo: types.comp.text, label: "Dflwhs:"
                },
                dfltaxcode: {
                    tipo: types.comp.text, label: "Dfltaxcode:"
                },
                revoffice: {
                    tipo: types.comp.text, label: "Revoffice:"
                },
                taxidnum: {
                    tipo: types.comp.text, label: "Taxidnum:"
                },
                taxidnum2: {
                    tipo: types.comp.text, label: "Taxidnum2:"
                },
                taxidnum3: {
                    tipo: types.comp.text, label: "Taxidnum3:"
                },
                addtnlid: {
                    tipo: types.comp.text, label: "Addtnlid:"
                },
                compnature: {
                    tipo: types.comp.int, label: "Compnature:"
                },
                econactt: {
                    tipo: types.comp.int, label: "Econactt:"
                },
                credcorig: {
                    tipo: types.comp.text, label: "Credcorig:"
                },
                ipiperiod: {
                    tipo: types.comp.text, label: "Ipiperiod:"
                },
                coopassoct: {
                    tipo: types.comp.int, label: "Coopassoct:"
                },
                prefstate: {
                    tipo: types.comp.text, label: "Prefstate:"
                },
                proftax: {
                    tipo: types.comp.int, label: "Proftax:"
                },
                compqualif: {
                    tipo: types.comp.int, label: "Compqualif:"
                },
                decltype: {
                    tipo: types.comp.int, label: "Decltype:"
                },
                addrtype: {
                    tipo: types.comp.text, label: "Addrtype:"
                },
                street: {
                    tipo: types.comp.text, label: "Street:"
                },
                streetno: {
                    tipo: types.comp.text, label: "Streetno:"
                },
                building: {
                    tipo: types.comp.text, label: "Building:"
                },
                zipcode: {
                    tipo: types.comp.text, label: "Zipcode:"
                },
                block: {
                    tipo: types.comp.text, label: "Block:"
                },
                city: {
                    tipo: types.comp.text, label: "City:"
                },
                state: {
                    tipo: types.comp.text, label: "State:"
                },
                county: {
                    tipo: types.comp.text, label: "County:"
                },
                country: {
                    tipo: types.comp.text, label: "Country:"
                },
                pmtclract: {
                    tipo: types.comp.text, label: "Pmtclract:"
                },
                commerreg: {
                    tipo: types.comp.text, label: "Commerreg:"
                },
                dateofinc: {
                    tipo: types.comp.datetime, label: "Dateofinc:"
                },
                spedprof: {
                    tipo: types.comp.text, label: "Spedprof:"
                },
                envtypenfe: {
                    tipo: types.comp.int, label: "Envtypenfe:"
                },
                opt4icms: {
                    tipo: types.comp.text, label: "Opt4icms:"
                },
                aliasname: {
                    tipo: types.comp.text_big, label: "Aliasname:"
                },
                glbllocnum: {
                    tipo: types.comp.text, label: "Glbllocnum:"
                }
            }
        }
    };

    // Providers
    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['sap', 'simples', 'filiais']
                }
            },
            where: [
                ["AND", '0', "bplid", types.where.check]
            ]
        }

    };
}

// Types
const types = require('../../../../types');

// Exporta
module.exports = Filiais;
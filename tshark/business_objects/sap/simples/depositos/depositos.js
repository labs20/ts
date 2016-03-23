/**
 * Implementa depósitos SAP
 * externo
 * @constructor
 */
function Depositos() {

    // Id
    this.id = 'depositos';

    // Map
    this.source = {
        table: 'owhs',
        metadata: {
            key: 'whscode',
            fields: {
                whscode: {
                    tipo: types.comp.text, label: "Whscode:"
                },
                whsname: {
                    tipo: types.comp.text, label: "Whsname:"
                },
                intrnalkey: {
                    tipo: types.comp.int, label: "Intrnalkey:"
                },
                grp_code: {
                    tipo: types.comp.text, label: "Grp Code:"
                },
                balinvntac: {
                    tipo: types.comp.text, label: "Balinvntac:"
                },
                salecostac: {
                    tipo: types.comp.text, label: "Salecostac:"
                },
                transferac: {
                    tipo: types.comp.text, label: "Transferac:"
                },
                locked: {
                    tipo: types.comp.text, label: "Locked:"
                },
                datasource: {
                    tipo: types.comp.text, label: "Datasource:"
                },
                usersign: {
                    tipo: types.comp.int, label: "Usersign:"
                },
                revenuesac: {
                    tipo: types.comp.text, label: "Revenuesac:"
                },
                varianceac: {
                    tipo: types.comp.text, label: "Varianceac:"
                },
                decreasac: {
                    tipo: types.comp.text, label: "Decreasac:"
                },
                increasac: {
                    tipo: types.comp.text, label: "Increasac:"
                },
                returnac: {
                    tipo: types.comp.text, label: "Returnac:"
                },
                expensesac: {
                    tipo: types.comp.text, label: "Expensesac:"
                },
                eurevenuac: {
                    tipo: types.comp.text, label: "Eurevenuac:"
                },
                euexpensac: {
                    tipo: types.comp.text, label: "Euexpensac:"
                },
                frrevenuac: {
                    tipo: types.comp.text, label: "Frrevenuac:"
                },
                frexpensac: {
                    tipo: types.comp.text, label: "Frexpensac:"
                },
                vatgroup: {
                    tipo: types.comp.text, label: "Vatgroup:"
                },
                street: {
                    tipo: types.comp.text, label: "Street:"
                },
                block: {
                    tipo: types.comp.text, label: "Block:"
                },
                zipcode: {
                    tipo: types.comp.text, label: "Zipcode:"
                },
                city: {
                    tipo: types.comp.text, label: "City:"
                },
                county: {
                    tipo: types.comp.text, label: "County:"
                },
                country: {
                    tipo: types.comp.text, label: "Country:"
                },
                state: {
                    tipo: types.comp.text, label: "State:"
                },
                location: {
                    tipo: types.comp.int, label: "Location:"
                },
                dropship: {
                    tipo: types.comp.text, label: "Dropship:"
                },
                exmptincom: {
                    tipo: types.comp.text, label: "Exmptincom:"
                },
                usetax: {
                    tipo: types.comp.text, label: "Usetax:"
                },
                pricedifac: {
                    tipo: types.comp.text, label: "Pricedifac:"
                },
                exchangeac: {
                    tipo: types.comp.text, label: "Exchangeac:"
                },
                balanceacc: {
                    tipo: types.comp.text, label: "Balanceacc:"
                },
                purchaseac: {
                    tipo: types.comp.text, label: "Purchaseac:"
                },
                pareturnac: {
                    tipo: types.comp.text, label: "Pareturnac:"
                },
                purchofsac: {
                    tipo: types.comp.text, label: "Purchofsac:"
                },
                fedtaxid: {
                    tipo: types.comp.text, label: "Fedtaxid:"
                },
                building: {
                    tipo: types.comp.text_big, label: "Building:"
                },
                shpdgdsact: {
                    tipo: types.comp.text, label: "Shpdgdsact:"
                },
                vatrevact: {
                    tipo: types.comp.text, label: "Vatrevact:"
                },
                decresglac: {
                    tipo: types.comp.text, label: "Decresglac:"
                },
                incresglac: {
                    tipo: types.comp.text, label: "Incresglac:"
                },
                nettable: {
                    tipo: types.comp.text, label: "Nettable:"
                },
                stokrvlact: {
                    tipo: types.comp.text, label: "Stokrvlact:"
                },
                stkoffsact: {
                    tipo: types.comp.text, label: "Stkoffsact:"
                },
                wipacct: {
                    tipo: types.comp.text, label: "Wipacct:"
                },
                wipvaracct: {
                    tipo: types.comp.text, label: "Wipvaracct:"
                },
                costrvlact: {
                    tipo: types.comp.text, label: "Costrvlact:"
                },
                cstoffsact: {
                    tipo: types.comp.text, label: "Cstoffsact:"
                },
                expclract: {
                    tipo: types.comp.text, label: "Expclract:"
                },
                expofstact: {
                    tipo: types.comp.text, label: "Expofstact:"
                },
                objtype: {
                    tipo: types.comp.text, label: "Objtype:"
                },
                loginstanc: {
                    tipo: types.comp.int, label: "Loginstanc:"
                },
                createdate: {
                    tipo: types.comp.datetime, label: "Createdate:"
                },
                usersign2: {
                    tipo: types.comp.int, label: "Usersign2:"
                },
                updatedate: {
                    tipo: types.comp.datetime, label: "Updatedate:"
                },
                arcmact: {
                    tipo: types.comp.text, label: "Arcmact:"
                },
                arcmfrnact: {
                    tipo: types.comp.text, label: "Arcmfrnact:"
                },
                arcmeuact: {
                    tipo: types.comp.text, label: "Arcmeuact:"
                },
                arcmexpact: {
                    tipo: types.comp.text, label: "Arcmexpact:"
                },
                apcmact: {
                    tipo: types.comp.text, label: "Apcmact:"
                },
                apcmfrnact: {
                    tipo: types.comp.text, label: "Apcmfrnact:"
                },
                apcmeuact: {
                    tipo: types.comp.text, label: "Apcmeuact:"
                },
                revretact: {
                    tipo: types.comp.text, label: "Revretact:"
                },
                bplid: {
                    tipo: types.comp.int, label: "Bplid:"
                },
                ownercode: {
                    tipo: types.comp.text, label: "Ownercode:"
                },
                negstckact: {
                    tipo: types.comp.text, label: "Negstckact:"
                },
                stkintnact: {
                    tipo: types.comp.text, label: "Stkintnact:"
                },
                addrtype: {
                    tipo: types.comp.text, label: "Addrtype:"
                },
                streetno: {
                    tipo: types.comp.text, label: "Streetno:"
                },
                purbalact: {
                    tipo: types.comp.text, label: "Purbalact:"
                },
                excisable: {
                    tipo: types.comp.text, label: "Excisable:"
                },
                whicenact: {
                    tipo: types.comp.text, label: "Whicenact:"
                },
                whocenact: {
                    tipo: types.comp.text, label: "Whocenact:"
                },
                whshipto: {
                    tipo: types.comp.text, label: "Whshipto:"
                },
                wipoffset: {
                    tipo: types.comp.text, label: "Wipoffset:"
                },
                stockoffst: {
                    tipo: types.comp.text, label: "Stockoffst:"
                },
                storkeeper: {
                    tipo: types.comp.int, label: "Storkeeper:"
                },
                shipper: {
                    tipo: types.comp.text, label: "Shipper:"
                },
                binactivat: {
                    tipo: types.comp.text, label: "Binactivat:"
                },
                binseptor: {
                    tipo: types.comp.text, label: "Binseptor:"
                },
                dftbinabs: {
                    tipo: types.comp.int, label: "Dftbinabs:"
                },
                dftbinenfd: {
                    tipo: types.comp.text, label: "Dftbinenfd:"
                },
                autoissmtd: {
                    tipo: types.comp.int, label: "Autoissmtd:"
                },
                managesnb: {
                    tipo: types.comp.text, label: "Managesnb:"
                },
                recitemsby: {
                    tipo: types.comp.int, label: "Recitemsby:"
                },
                recbinenab: {
                    tipo: types.comp.text, label: "Recbinenab:"
                },
                glbllocnum: {
                    tipo: types.comp.text, label: "Glbllocnum:"
                },
                recvempbin: {
                    tipo: types.comp.text, label: "Recvempbin:"
                },
                inactive: {
                    tipo: types.comp.text, label: "Inactive:"
                },
                recvmaxqty: {
                    tipo: types.comp.text, label: "Recvmaxqty:"
                },
                autorecvmd: {
                    tipo: types.comp.int, label: "Autorecvmd:"
                }
            }
        }
    };

    // Providers
    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['sap', 'simples', 'depositos']
                }
            },
            where: [
                ["AND", '0', "whscode", types.where.check]
            ]
        }

    };
}

// Types
const types = require('../../../../types');

// Exporta
module.exports = Depositos;
/**
 * Created by labs on 20/02/16.
 */

/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Pns() {

    // Id
    this.id = 'pns';

    // Map
    this.source = {
        table: 'ocrd',
        metadata: {
            key: 'cardcode',
            fields: {
                cardcode: {
                    tipo: types.comp.text, default: "NEW_KEY", label: "Cód. SAP:"
                },
                cardname: {
                    tipo: types.comp.text, label: "Nome:"
                },
                cardfname: {
                    tipo: types.comp.text, label: "Nome fantasia:"
                },
                aliasname: {
                    tipo: types.comp.text_big, label: "Nome do alias:"
                },
                cardtype: {
                    tipo: types.comp.text, label: "Tipo:"
                },
                groupcode: {
                    tipo: types.comp.int, label: "Grupo:"
                },
                cmpprivate: {
                    tipo: types.comp.text, label: "Tipo de parceiro de negócio:"
                },
                address: {
                    tipo: types.comp.text, label: "Rua/caixa postal:"
                },
                zipcode: {
                    tipo: types.comp.text, label: "CEP:"
                },
                mailaddres: {
                    tipo: types.comp.text, label: "Rua/caixa postal:"
                },
                mailzipcod: {
                    tipo: types.comp.text, label: "CEP:"
                },
                phone1: {
                    tipo: types.comp.text, label: "Tel:"
                },
                phone2: {
                    tipo: types.comp.text, label: "DDD:"
                },
                fax: {
                    tipo: types.comp.text, label: "Fax:"
                },
                cntctprsn: {
                    tipo: types.comp.text, label: "Cntctprsn:"
                },
                mainusage: {
                    tipo: types.comp.text, label: "MainUsage:"
                },
                notes: {
                    tipo: types.comp.text, label: "Observações:"
                },
                balance: {
                    tipo: types.comp.float, label: "Balance:"
                },
                checksbal: {
                    tipo: types.comp.float, label: "Checksbal:"
                },
                dnotesbal: {
                    tipo: types.comp.float, label: "Dnotesbal:"
                },
                ordersbal: {
                    tipo: types.comp.float, label: "Ordersbal:"
                },
                groupnum: {
                    tipo: types.comp.int, label: "Condições de pgto.:"
                },
                creditline: {
                    tipo: types.comp.float, label: "Lim Credito:"
                },
                debtline: {
                    tipo: types.comp.float, label: "Limite de compromisso:"
                },
                discount: {
                    tipo: types.comp.float, label: "% total de desconto:"
                },
                vatstatus: {
                    tipo: types.comp.text, label: "Vatstatus:"
                },
                lictradnum: {
                    tipo: types.comp.text, label: "Lictradnum:"
                },
                ddctstatus: {
                    tipo: types.comp.text, label: "Ddctstatus:"
                },
                ddctprcnt: {
                    tipo: types.comp.float, label: "Ddctprcnt:"
                },
                validuntil: {
                    tipo: types.comp.datetime, label: "Validuntil:"
                },
                chrctrstcs: {
                    tipo: types.comp.int, label: "Chrctrstcs:"
                },
                exmatchnum: {
                    tipo: types.comp.int, label: "Exmatchnum:"
                },
                inmatchnum: {
                    tipo: types.comp.int, label: "Inmatchnum:"
                },
                listnum: {
                    tipo: types.comp.int, label: "Listnum:"
                },
                dnotebalfc: {
                    tipo: types.comp.float, label: "Dnotebalfc:"
                },
                orderbalfc: {
                    tipo: types.comp.float, label: "Orderbalfc:"
                },
                dnotebalsy: {
                    tipo: types.comp.float, label: "Dnotebalsy:"
                },
                orderbalsy: {
                    tipo: types.comp.float, label: "Orderbalsy:"
                },
                transfered: {
                    tipo: types.comp.text, label: "Transfered:"
                },
                baltrnsfrd: {
                    tipo: types.comp.text, label: "Baltrnsfrd:"
                },
                intrstrate: {
                    tipo: types.comp.float, label: "Intrstrate:"
                },
                commission: {
                    tipo: types.comp.float, label: "Commission:"
                },
                commgrcode: {
                    tipo: types.comp.int, label: "Commgrcode:"
                },
                free_text: {
                    tipo: types.comp.text_big, label: "Observações:"
                },
                slpcode: {
                    tipo: types.comp.int, label: "Slpcode:"
                },
                prevyearac: {
                    tipo: types.comp.text, label: "Prevyearac:"
                },
                currency: {
                    tipo: types.comp.text, label: "Currency:"
                },
                ratedifact: {
                    tipo: types.comp.text, label: "Ratedifact:"
                },
                balancesys: {
                    tipo: types.comp.float, label: "Balancesys:"
                },
                balancefc: {
                    tipo: types.comp.float, label: "Balancefc:"
                },
                protected: {
                    tipo: types.comp.text, label: "Protected:"
                },
                cellular: {
                    tipo: types.comp.text, label: "Tel.celular:"
                },
                avragelate: {
                    tipo: types.comp.int, label: "Avragelate:"
                },
                city: {
                    tipo: types.comp.text, label: "Cidade:"
                },
                county: {
                    tipo: types.comp.text, label: "Município:"
                },
                country: {
                    tipo: types.comp.text, label: "País:"
                },
                mailcity: {
                    tipo: types.comp.text, label: "Cidade:"
                },
                mailcounty: {
                    tipo: types.comp.text, label: "Município:"
                },
                mailcountr: {
                    tipo: types.comp.text, label: "País:"
                },
                e_mail: {
                    tipo: types.comp.text, label: "Email:"
                },
                picture: {
                    tipo: types.comp.text, label: "Picture:"
                },
                dflaccount: {
                    tipo: types.comp.text, label: "Dflaccount:"
                },
                dflbranch: {
                    tipo: types.comp.text, label: "Dflbranch:"
                },
                bankcode: {
                    tipo: types.comp.text, label: "Bankcode:"
                },
                addid: {
                    tipo: types.comp.text, label: "Addid:"
                },
                pager: {
                    tipo: types.comp.text, label: "Pager:"
                },
                fathercard: {
                    tipo: types.comp.text, label: "Fathercard:"
                },
                fathertype: {
                    tipo: types.comp.text, label: "Fathertype:"
                },
                qrygroup1: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 1:"
                },
                qrygroup2: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 2:"
                },
                qrygroup3: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 3:"
                },
                qrygroup4: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 4:"
                },
                qrygroup5: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 5:"
                },
                qrygroup6: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 6:"
                },
                qrygroup7: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 7:"
                },
                qrygroup8: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 8:"
                },
                qrygroup9: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 9:"
                },
                qrygroup10: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 10:"
                },
                qrygroup11: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 11:"
                },
                qrygroup12: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 12:"
                },
                qrygroup13: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 13:"
                },
                qrygroup14: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 14:"
                },
                qrygroup15: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 15:"
                },
                qrygroup16: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 16:"
                },
                qrygroup17: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 17:"
                },
                qrygroup18: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 18:"
                },
                qrygroup19: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 19:"
                },
                qrygroup20: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 20:"
                },
                qrygroup21: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 21:"
                },
                qrygroup22: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 22:"
                },
                qrygroup23: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 23:"
                },
                qrygroup24: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 24:"
                },
                qrygroup25: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 25:"
                },
                qrygroup26: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 26:"
                },
                qrygroup27: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 27:"
                },
                qrygroup28: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 28:"
                },
                qrygroup29: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 29:"
                },
                qrygroup30: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 30:"
                },
                qrygroup31: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 31:"
                },
                qrygroup32: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 32:"
                },
                qrygroup33: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 33:"
                },
                qrygroup34: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 34:"
                },
                qrygroup35: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 35:"
                },
                qrygroup36: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 36:"
                },
                qrygroup37: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 37:"
                },
                qrygroup38: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 38:"
                },
                qrygroup39: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 39:"
                },
                qrygroup40: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 40:"
                },
                qrygroup41: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 41:"
                },
                qrygroup42: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 42:"
                },
                qrygroup43: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 43:"
                },
                qrygroup44: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 44:"
                },
                qrygroup45: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 45:"
                },
                qrygroup46: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 46:"
                },
                qrygroup47: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 47:"
                },
                qrygroup48: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 48:"
                },
                qrygroup49: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 49:"
                },
                qrygroup50: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 50:"
                },
                qrygroup51: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 51:"
                },
                qrygroup52: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 52:"
                },
                qrygroup53: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 53:"
                },
                qrygroup54: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 54:"
                },
                qrygroup55: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 55:"
                },
                qrygroup56: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 56:"
                },
                qrygroup57: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 57:"
                },
                qrygroup58: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 58:"
                },
                qrygroup59: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 59:"
                },
                qrygroup60: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 60:"
                },
                qrygroup61: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 61:"
                },
                qrygroup62: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 62:"
                },
                qrygroup63: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 63:"
                },
                qrygroup64: {
                    tipo: types.comp.text, label: "Parceiros de negócios propriedade 64:"
                },
                ddctoffice: {
                    tipo: types.comp.text, label: "Ddctoffice:"
                },
                createdate: {
                    tipo: types.comp.datetime, label: "Createdate:"
                },
                updatedate: {
                    tipo: types.comp.datetime, label: "Updatedate:"
                },
                exportcode: {
                    tipo: types.comp.text, label: "Exportcode:"
                },
                dscntobjct: {
                    tipo: types.comp.int, label: "Dscntobjct:"
                },
                dscntrel: {
                    tipo: types.comp.text, label: "Dscntrel:"
                },
                spgcounter: {
                    tipo: types.comp.int, label: "Spgcounter:"
                },
                sppcounter: {
                    tipo: types.comp.int, label: "Sppcounter:"
                },
                ddctfileno: {
                    tipo: types.comp.text, label: "Ddctfileno:"
                },
                scncounter: {
                    tipo: types.comp.int, label: "Scncounter:"
                },
                minintrst: {
                    tipo: types.comp.float, label: "Minintrst:"
                },
                datasource: {
                    tipo: types.comp.text, label: "Datasource:"
                },
                oprcount: {
                    tipo: types.comp.int, label: "Oprcount:"
                },
                exemptno: {
                    tipo: types.comp.text, label: "Exemptno:"
                },
                priority: {
                    tipo: types.comp.int, label: "Prioridade:"
                },
                creditcard: {
                    tipo: types.comp.int, label: "Tipo cart�o cr�dito:"
                },
                crcardnum: {
                    tipo: types.comp.text, label: "N� cart�o de cr�dito:"
                },
                cardvalid: {
                    tipo: types.comp.datetime, label: "Data de vencimento:"
                },
                usersign: {
                    tipo: types.comp.int, label: "Usersign:"
                },
                locmth: {
                    tipo: types.comp.text, label: "Locmth:"
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
                frozenfor: {
                    tipo: types.comp.text, label: "Frozenfor:"
                },
                frozenfrom: {
                    tipo: types.comp.datetime, label: "Frozenfrom:"
                },
                frozento: {
                    tipo: types.comp.datetime, label: "Frozento:"
                },
                semployed: {
                    tipo: types.comp.text, label: "Semployed:"
                },
                mthcounter: {
                    tipo: types.comp.int, label: "Mthcounter:"
                },
                bnkcounter: {
                    tipo: types.comp.int, label: "Bnkcounter:"
                },
                ddgkey: {
                    tipo: types.comp.int, label: "Ddgkey:"
                },
                ddtkey: {
                    tipo: types.comp.int, label: "Ddtkey:"
                },
                validcomm: {
                    tipo: types.comp.text, label: "Validcomm:"
                },
                frozencomm: {
                    tipo: types.comp.text, label: "Frozencomm:"
                },
                chainstore: {
                    tipo: types.comp.text, label: "Chainstore:"
                },
                discinret: {
                    tipo: types.comp.text, label: "Discinret:"
                },
                state1: {
                    tipo: types.comp.text, label: "Estado:"
                },
                state2: {
                    tipo: types.comp.text, label: "Estado:"
                },
                vatgroup: {
                    tipo: types.comp.text, label: "Vatgroup:"
                },
                loginstanc: {
                    tipo: types.comp.int, label: "Loginstanc:"
                },
                objtype: {
                    tipo: types.comp.text, label: "Objtype:"
                },
                indicator: {
                    tipo: types.comp.text, label: "Indicator:"
                },
                shiptype: {
                    tipo: types.comp.int, label: "Tipo de Envio:"
                },
                debpayacct: {
                    tipo: types.comp.text, label: "Debpayacct:"
                },
                shiptodef: {
                    tipo: types.comp.text, label: "End , default:"
                },
                block: {
                    tipo: types.comp.text, label: "Bairro:"
                },
                mailblock: {
                    tipo: types.comp.text, label: "Bairro:"
                },
                password: {
                    tipo: types.comp.text, label: "Password:"
                },
                ecvatgroup: {
                    tipo: types.comp.text, label: "Ecvatgroup:"
                },
                deleted: {
                    tipo: types.comp.text, label: "Deleted:"
                },
                iban: {
                    tipo: types.comp.text, label: "Iban:"
                },
                docentry: {
                    tipo: types.comp.int, label: "Docentry:"
                },
                formcode: {
                    tipo: types.comp.int, label: "Formcode:"
                },
                box1099: {
                    tipo: types.comp.text, label: "Box1099:"
                },
                pymcode: {
                    tipo: types.comp.text, label: "Pymcode:"
                },
                backorder: {
                    tipo: types.comp.text, label: "Backorder:"
                },
                partdelivr: {
                    tipo: types.comp.text, label: "Partdelivr:"
                },
                dunnlevel: {
                    tipo: types.comp.int, label: "Dunnlevel:"
                },
                dunndate: {
                    tipo: types.comp.datetime, label: "Dunndate:"
                },
                blockdunn: {
                    tipo: types.comp.text, label: "Blockdunn:"
                },
                bankcountr: {
                    tipo: types.comp.text, label: "Bankcountr:"
                },
                collecauth: {
                    tipo: types.comp.text, label: "Collecauth:"
                },
                dme: {
                    tipo: types.comp.text, label: "Dme:"
                },
                instruckey: {
                    tipo: types.comp.text, label: "Instruckey:"
                },
                singlepaym: {
                    tipo: types.comp.text, label: "Singlepaym:"
                },
                isrbillid: {
                    tipo: types.comp.text, label: "Isrbillid:"
                },
                paymblock: {
                    tipo: types.comp.text, label: "Paymblock:"
                },
                refdetails: {
                    tipo: types.comp.text, label: "Refdetails:"
                },
                housebank: {
                    tipo: types.comp.text, label: "Housebank:"
                },
                owneridnum: {
                    tipo: types.comp.text, label: "Owneridnum:"
                },
                pyblckdesc: {
                    tipo: types.comp.int, label: "Pyblckdesc:"
                },
                housbnkcry: {
                    tipo: types.comp.text, label: "Housbnkcry:"
                },
                housbnkact: {
                    tipo: types.comp.text, label: "Housbnkact:"
                },
                housbnkbrn: {
                    tipo: types.comp.text, label: "Housbnkbrn:"
                },
                projectcod: {
                    tipo: types.comp.text, label: "Projectcod:"
                },
                sysmatchno: {
                    tipo: types.comp.int, label: "Sysmatchno:"
                },
                vatiduncmp: {
                    tipo: types.comp.text, label: "Vatiduncmp:"
                },
                agentcode: {
                    tipo: types.comp.text, label: "Agentcode:"
                },
                tolrncdays: {
                    tipo: types.comp.int, label: "Tolrncdays:"
                },
                selfinvoic: {
                    tipo: types.comp.text, label: "Selfinvoic:"
                },
                deferrtax: {
                    tipo: types.comp.text, label: "Deferrtax:"
                },
                letternum: {
                    tipo: types.comp.text, label: "Letternum:"
                },
                maxamount: {
                    tipo: types.comp.float, label: "Maxamount:"
                },
                fromdate: {
                    tipo: types.comp.datetime, label: "Fromdate:"
                },
                todate: {
                    tipo: types.comp.datetime, label: "Todate:"
                },
                wtliable: {
                    tipo: types.comp.text, label: "Wtliable:"
                },
                crtfcateno: {
                    tipo: types.comp.text, label: "Crtfcateno:"
                },
                expiredate: {
                    tipo: types.comp.datetime, label: "Expiredate:"
                },
                ninum: {
                    tipo: types.comp.text, label: "Ninum:"
                },
                acccritria: {
                    tipo: types.comp.text, label: "Acccritria:"
                },
                wtcode: {
                    tipo: types.comp.text, label: "Wtcode:"
                },
                equ: {
                    tipo: types.comp.text, label: "Equ:"
                },
                hldcode: {
                    tipo: types.comp.text, label: "Hldcode:"
                },
                connbp: {
                    tipo: types.comp.text, label: "Connbp:"
                },
                mltmthnum: {
                    tipo: types.comp.int, label: "Mltmthnum:"
                },
                typwtreprt: {
                    tipo: types.comp.text, label: "Typwtreprt:"
                },
                vatregnum: {
                    tipo: types.comp.text, label: "Vatregnum:"
                },
                repname: {
                    tipo: types.comp.text, label: "Repname:"
                },
                industry: {
                    tipo: types.comp.text_big, label: "Industry:"
                },
                business: {
                    tipo: types.comp.text_big, label: "Business:"
                },
                wttaxcat: {
                    tipo: types.comp.text_big, label: "Wttaxcat:"
                },
                isdomestic: {
                    tipo: types.comp.text, label: "Isdomestic:"
                },
                isresident: {
                    tipo: types.comp.text, label: "Isresident:"
                },
                autocalbcg: {
                    tipo: types.comp.text, label: "Autocalbcg:"
                },
                otrctlacct: {
                    tipo: types.comp.text, label: "Otrctlacct:"
                },
                building: {
                    tipo: types.comp.text_big, label: "Complemento:"
                },
                mailbuildi: {
                    tipo: types.comp.text_big, label: "Complemento:"
                },
                boeprsnt: {
                    tipo: types.comp.text, label: "Boeprsnt:"
                },
                boediscnt: {
                    tipo: types.comp.text, label: "Boediscnt:"
                },
                boeonclct: {
                    tipo: types.comp.text, label: "Boeonclct:"
                },
                unpaidboe: {
                    tipo: types.comp.text, label: "Unpaidboe:"
                },
                itwtcode: {
                    tipo: types.comp.text, label: "Itwtcode:"
                },
                dunterm: {
                    tipo: types.comp.text, label: "Dunterm:"
                },
                channlbp: {
                    tipo: types.comp.text, label: "Channlbp:"
                },
                dftcnician: {
                    tipo: types.comp.int, label: "Dftcnician:"
                },
                territory: {
                    tipo: types.comp.int, label: "Territory:"
                },
                billtodef: {
                    tipo: types.comp.text, label: "Billtodef:"
                },
                dpmclear: {
                    tipo: types.comp.text, label: "Dpmclear:"
                },
                intrntsite: {
                    tipo: types.comp.text, label: "Web Site:"
                },
                langcode: {
                    tipo: types.comp.int, label: "Langcode:"
                },
                housactkey: {
                    tipo: types.comp.int, label: "Housactkey:"
                },
                profession: {
                    tipo: types.comp.text, label: "Profiss�o:"
                },
                cdpnum: {
                    tipo: types.comp.int, label: "Cdpnum:"
                },
                dflbankkey: {
                    tipo: types.comp.int, label: "Dflbankkey:"
                },
                bcacode: {
                    tipo: types.comp.text, label: "Bcacode:"
                },
                useshpdgd: {
                    tipo: types.comp.text, label: "Useshpdgd:"
                },
                regnum: {
                    tipo: types.comp.text, label: "Regnum:"
                },
                verifnum: {
                    tipo: types.comp.text, label: "Verifnum:"
                },
                bankctlkey: {
                    tipo: types.comp.text, label: "Bankctlkey:"
                },
                housctlkey: {
                    tipo: types.comp.text, label: "Housctlkey:"
                },
                addrtype: {
                    tipo: types.comp.text, label: "Tipo de logradouro:"
                },
                insurop347: {
                    tipo: types.comp.text, label: "Insurop347:"
                },
                mailaddrty: {
                    tipo: types.comp.text, label: "Tipo de logradouro:"
                },
                streetno: {
                    tipo: types.comp.text, label: "Rua n�:"
                },
                mailstrno: {
                    tipo: types.comp.text, label: "Rua n�:"
                },
                taxrndrule: {
                    tipo: types.comp.text, label: "Taxrndrule:"
                },
                vendtid: {
                    tipo: types.comp.int, label: "Vendtid:"
                },
                threshover: {
                    tipo: types.comp.text, label: "Threshover:"
                },
                surover: {
                    tipo: types.comp.text, label: "Surover:"
                },
                vendorocup: {
                    tipo: types.comp.text, label: "Vendorocup:"
                },
                opcode347: {
                    tipo: types.comp.text, label: "Opcode347:"
                },
                dpmintact: {
                    tipo: types.comp.text, label: "Dpmintact:"
                },
                residennum: {
                    tipo: types.comp.text, label: "Residennum:"
                },
                usersign2: {
                    tipo: types.comp.int, label: "Usersign2:"
                },
                plnggroup: {
                    tipo: types.comp.text, label: "Plnggroup:"
                },
                vatidnum: {
                    tipo: types.comp.text, label: "Vatidnum:"
                },
                affiliate: {
                    tipo: types.comp.text, label: "Affiliate:"
                },
                mivzexpsts: {
                    tipo: types.comp.text, label: "Mivzexpsts:"
                },
                hierchddct: {
                    tipo: types.comp.text, label: "Hierchddct:"
                },
                certwht: {
                    tipo: types.comp.text, label: "Certwht:"
                },
                certbkeep: {
                    tipo: types.comp.text, label: "Certbkeep:"
                },
                whshaamgrp: {
                    tipo: types.comp.text, label: "Whshaamgrp:"
                },
                industryc: {
                    tipo: types.comp.int, label: "Setor industrial:"
                },
                datevacct: {
                    tipo: types.comp.int, label: "Datevacct:"
                },
                datevfirst: {
                    tipo: types.comp.text, label: "Datevfirst:"
                },
                gtsregnum: {
                    tipo: types.comp.text, label: "Gtsregnum:"
                },
                gtsbankact: {
                    tipo: types.comp.text, label: "Gtsbankact:"
                },
                gtsbiladdr: {
                    tipo: types.comp.text, label: "Gtsbiladdr:"
                },
                hsbnkswift: {
                    tipo: types.comp.text, label: "Hsbnkswift:"
                },
                hsbnkiban: {
                    tipo: types.comp.text, label: "Hsbnkiban:"
                },
                dflswift: {
                    tipo: types.comp.text, label: "Dflswift:"
                },
                autopost: {
                    tipo: types.comp.text, label: "Autopost:"
                },
                intracc: {
                    tipo: types.comp.text, label: "Intracc:"
                },
                feeacc: {
                    tipo: types.comp.text, label: "Feeacc:"
                },
                cpnno: {
                    tipo: types.comp.int, label: "Cpnno:"
                },
                ntswebsite: {
                    tipo: types.comp.int, label: "Ntswebsite:"
                },
                dfliban: {
                    tipo: types.comp.text, label: "Dfliban:"
                },
                series: {
                    tipo: types.comp.int, label: "Series:"
                },
                number: {
                    tipo: types.comp.int, label: "Number:"
                },
                edocexpfrm: {
                    tipo: types.comp.int, label: "Edocexpfrm:"
                },
                taxidident: {
                    tipo: types.comp.text, label: "Taxidident:"
                },
                attachment: {
                    tipo: types.comp.text_big, label: "Attachment:"
                },
                atcentry: {
                    tipo: types.comp.int, label: "Atcentry:"
                },
                dflagrmnt: {
                    tipo: types.comp.int, label: "Dflagrmnt:"
                }
            }
        }
    };

    // Providers
    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['sap', 'simples', 'pns']
                }
            },
            where: [
                ["AND", '0', "cardcode", "check"]
            ]
        }

    };
}

// Types
const types = require('../../../../types');

// Exporta
module.exports = Pns;
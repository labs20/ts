/**
 * Padronização de tipos
 * @author labs
 * @since 19/03/16.
 */
function Types(){

}

//region :: Forms

/**
 * Tipos para configuração de form
 */
Types.prototype.form = {
    size: {
        small       :   'small',        // defalt
        large       :   'large'
    },
    lines:{
        distribution: {
            percent : 'percent',        // defalt
            equal   : 'equal width'
        },
        labels:{
            inline  : 'inline',
            ontop   : 'ontop'           // defalt
        }
    },
    state: {
        ok          : 'ok',             // defalt
        loading     : 'loading',
        disabled    : 'disabled',
        success     : 'success',
        error       : 'error',
        warning     : 'warning'
    }
};

Types.prototype.ctrls = {
    state:{
        required    : 'required',
        disabled    : 'disabled',
        readonly    : 'readonly'
    },
    labels: {
        inline      : 'inline',
        ontop       : 'ontop'           // defalt
    }
};

/**
 * Tipos de componentes
 */
Types.prototype.comp = {
    key         : { type: 'int',        comp: 'inpInt',         default: 'NEW_KEY'  },
    int         : { type: 'int',        comp: 'inpInt',         default: 0  },

    text        : { type: 'string',     comp: 'inpText',        default: '' },
    text_small  : { type: 'text',       comp: 'inpMemoShort',   default: '' },
    text_big    : { type: 'text',       comp: 'inpMemo',        default: '' },
    text_huge   : { type: 'text',       comp: 'inpMemoLong',    default: '' },

    float       : { type: 'float',      comp: 'inpFloat',       default: 0.0 },
    money       : { type: 'float',      comp: 'inpMoney',       default: 0.0 },
    percent     : { type: 'float',      comp: 'inpPercent',     default: 0.0 },

    check       : { type: 'bool',       comp: 'inpCheckBox',    default: 0 },
    slider      : { type: 'bool',       comp: 'inpSlider',      default: 0 },
    toggle      : { type: 'bool',       comp: 'inpToggle',      default: 0 },
    radio       : { type: 'string',     comp: 'inpRadio',       default: '' },

    dropdown    : { type: 'string',     comp: 'inpDropdown',    default: '', multi: false },
    list        : { type: 'string',     comp: 'inpList',        default: '', multi: false },
    choose      : { type: 'string',     comp: 'inpChoose',      default: '', multi: false },

    date        : { type: 'date',       comp: 'inpDate',        default: 'NOW' },
    time        : { type: 'time',       comp: 'inpTime',        default: 'NOW' },
    datetime    : { type: 'datetime',   comp: 'inpDateTime',    default: 'NOW' }
};

//endregion


//region :: Providers

/**
 * Tipos de join
 */
Types.prototype.join = {
    inner   : 'inner',
    left    : 'left'
};

/**
 * Tipos de where
 */
Types.prototype.where = {

    /**
     * Check irá verificar se o valor do campo está disponível, e se não,
     * a clausula where será IGNORADA
     * @type { string }
     */
    check   : 'check',

    /**
     * Get irá verificar se o valor do campo está disponível, e se não,
     * será gerada uma clausula where que retora FALSE ( AND 1 = 2 )
     * @type { string }
     */
    get     : 'get'
};

/**
 * Tipos de search
 */
Types.prototype.search = {
    igual       :   '=',
    diferente   :   '<>',
    like        :   'LIKE',
    in          :   'IN',
    menor       :   '<',
    maior       :   '>',
    menor_igual :   '>=',
    maior_igual :   '<='
};

//endregion

// Exporta
module.exports = new Types();
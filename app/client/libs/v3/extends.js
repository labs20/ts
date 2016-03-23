/**
 * TShark 3.8
 * Biblioteca de extenções.
 * @copyright [== � 2014, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 08/12/14
 */

/**
 * Gera um n�mero aleat�rio entre 0 e n que n�o se repete
 * em sequencia.
 * @author labs
 * @since 11/2014
 **/
var _last_rand_ = -1;
function rand(n){
    var r = Math.floor(Math.random()*n);
    if (r == _last_rand_) r = rand(n);
    _last_rand_ = r;
    return r;
}
Number.prototype.rand = function(){ return rand(this); }


/**
 * Retorna a string com a primeira letra em upper.
 * @author labs
 * @since 11/2014
 **/
function capitalize(str){
    return ($.type(str) === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str);
}
String.prototype.capitalize = function() {
    return capitalize(this);
}


/**
 * Retorna a string convertida em int.
 * @author labs
 * @since 11/2014
 **/
function toInt(valor){
    if (!valor) {
        return 0;
    }
    valor = valor.toString().replace(/[\s\D]/gm, '') + '';
    var res = parseInt(valor);
    return (res == NaN ? 0 : res);
}
String.prototype.toInt = function() {
    return toInt(this);
}


/**
 * Retorna a string convertida em float.
 * @author labs
 * @since 11/2014
 **/
function toFloat(valor){
    if (!valor) {
        return 0;
    }
    if (valor === true){
        return 1;
    }
    /*if (typeof valor != "string") {
        return valor;
    }*/

    valor = valor.toString().replace(/[\s\$a-zA-Z]/gm, '') + '';

    var r=/\.|,/gi;
    var keywords = valor.split(r);
    var decimal  = false;
    if (keywords.length>1) {
        decimal = keywords.pop();
    }
    var f = parseFloat(keywords.join('') + (decimal ? '.' + decimal : ''));
    return (isNaN(f) ? 0 : f);
}
String.prototype.toFloat = function() {
    return toFloat(this);
}
Number.prototype.toFloat = function() {
    return parseFloat(this);
}

/**
 * Formata em moeda.
 * @author labs
 * @since 11/2014
 **/
Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    var res = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
        + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

    return res;
};
String.prototype.formatMoney = function(c, d, t){
    return toFloat(this).formatMoney(c,d,t)+'';
};

String.prototype.toMoney = function(c, d, t){
    return (this ? toFloat(this) : 0).formatMoney(c,d,t)+'';
};
Number.prototype.toMoney = function(c, d, t){
    return this.formatMoney(c,d,t);
};

function floatToStr(value){
    return toFloat(value).formatMoney();
}
String.prototype.floatToStr = function(c, d, t){
    return (this ? toFloat(this) : 0).formatMoney(c,d,t)+'';
};
Number.prototype.floatToStr = function(c, d, t){
    return this.formatMoney(c,d,t);
};

/**
 * Percentuais.
 * @author labs
 * @since 11/2014
 **/
function percentualDe(n, v, d){
    return (toFloat(n) * (toFloat(v)/100)).round(toFloat(d));
}
function percentualEm(n, v, d){
    return ((toFloat(n)*100)/toFloat(v)).round(toFloat(d));
}

Number.prototype.percentualDe = function(v, d){
    return percentualDe(this, v, d);
}
Number.prototype.percentualEm = function(v, d){
    return percentualEm(this, v, d);
}
Number.prototype.maisPercentualDe = function(v, d){
    return this + percentualDe(this, v, d);
}
Number.prototype.menosPercentualDe = function(v, d){
    return this - percentualDe(this, v, d);
}
Number.prototype.round = function(d){
    if (!d) d = 2;
    return Number(Math.round(this+'e'+d)+'e-'+d);
}

String.prototype.percentualDe = function(v, d) {
    return percentualDe(this, v, d);
}
String.prototype.percentualEm = function(v, d) {
    return percentualEm(this, v, d);
}
String.prototype.maisPercentualDe = function(v, d) {
    return toFloat(this) + percentualDe(this, v, d);
}
String.prototype.menosPercentualDe = function(v, d) {
    return toFloat(this) - percentualDe(this, v, d);
}

/**
 * Limita um string a um maximo de palavras.
 * @author labs
 * @since 11/2014
 **/
function maxWords(str, num, end){
    var ar = str.split(" ").slice(0, num);
    return ar.join(" ")+(end ? end : "");
}
String.prototype.maxWords = function(n, elipses) {
    return maxWords(this, n, elipses);
}


/**
 * Repete um string N vezes.
 * @author labs
 * @since 11/2014
 **/
function repeat(str, num){
    for (var x=0;x<parseInt(num);x++){
        str += '' + str;
    }
    return str;
}
String.prototype.repeat = function(n) {
    return repeat(this, n);
}
Number.prototype.repeat = function(n) {
    return repeat(this + '', n);
}


/**
 * Pad de string
 * @author labs
 * @since 11/2014
 **/
function strPad(str, chr, len, dir){
    if (str.length >= len) return str + '';

    var pad = (chr == null ? ' ' : '' + chr)
        .repeat(len - str.length)
        .substr(0, len - str.length);

    if (!dir || dir == 'right') return str + pad;
    if (dir == 'left') return pad + str;
}
String.prototype.pad    = function(chr, max, LEFT_RIGHT){
    return strPad(this, chr, max, LEFT_RIGHT);
}
Number.prototype.pad    = function(chr, max, LEFT_RIGHT) {
    return strPad(this+'', chr, max, LEFT_RIGHT);
}
String.prototype.strPad = function(chr, max, LEFT_RIGHT){
    return strPad(this, chr, max, LEFT_RIGHT);
}
Number.prototype.strPad = function(chr, max, LEFT_RIGHT) {
    return strPad(this+'', chr, max, LEFT_RIGHT);
}


/**
 * Transforma string "2014-06-02 00:00:00" em "02/06/2014"
 * @author labs
 * @since 11/2014
 **/
function _split_datetime(str, hora){
    var tmp = "",
        d = "//",
        h = "00:00:00"
    ;
    switch (str.length){
        case 19:
            tmp = str.split(" ");
            if (tmp.length > 1){
                if (tmp[0].search("[/|-]") > -1){
                    d = tmp[0];
                    h = tmp[1];
                } else {
                    h = tmp[0];
                    d = tmp[1];
                }
            } else {
                d = tmp[0];
            }
            break;

        case 10:
            d = str;
            break;

        case 8:
            h = str;
            break;
    }

    if (hora){
        return h.split(":");

    } else {
        var sep = (d.search("/") > -1 ? "/" : "-");
        tmp = d.split(sep);

        if (tmp[0].length == 4){
            return [tmp[2], tmp[1], tmp[0]];
        } else {
            return tmp;
        }
    }
}
String.prototype.fromDateTimeToDate  = function(){
    var d = _split_datetime(this);
    return d[0] + "/" + d[1] + "/" + d[2];
}
String.prototype.fromDateTimeToTime  = function(){
    var d = _split_datetime(this, true);
    return d[0] + ":" + d[1] + ":" + d[2];
}
String.prototype.fromDateTimeToDay   = function(){
    var d = _split_datetime(this);
    return d[0];
}
String.prototype.fromDateTimeToMonth = function(){
    var d = _split_datetime(this);
    return d[1];
}
String.prototype.fromDateTimeToYear  = function(){
    var d = _split_datetime(this);
    return d[2];
}

function sum(){
    var args = Array.prototype.slice.call(arguments);
    return (args.length
        ? args.reduce(function(a, b) {
                return a.toFloat() + b.toFloat();
            })
        : 0);
}


function hasProp(o, p){
    o = o || {};
    return o.hasOwnProperty(p);
}

// NEW selector
jQuery.expr[':'].Contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};

// OVERWRITES old selecor
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};


Object.values = function(obj){
    var vals = [], keys = Object.keys(obj);
    keys.forEach(function(key){
        vals.push(obj[key]);
    }, this);
    return vals;
};


// Array Remove - By John Resig (MIT Licensed)
/*Array.prototype.sremove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};*/



//region :: Rivetjs


/**
 * Implementa variáveis fixas em each
 *
var oldEach = rivets.binders['each-*'].routine;
rivets.binders['each-*'].routine = function(el, value){

    var first = true;
    if (value) {
        value.forEach(function (v, i) {
            if (typeof v == "object") {
                v['_index_'] = i;
                v['_first_'] = first;
                v['_last_'] = false;
                first = false;
            }
        });
        if (typeof  value[value.length - 1] == "object") {
            value[value.length - 1]['_last_'] = true;
        }
    }
    oldEach.call(this, el, value);
};


// Formatadores
rivets.formatters.concat = function(value) {
    var sep = arguments[1]
        , args = Array.prototype.slice.call(arguments, 2)
        ;
    args.unshift(value);
    return args.join(sep);
};

rivets.formatters.mais = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return toFloat(value) + (args.reduce(function(a, b) {
            return toFloat(a) + toFloat(b);
        }, 0));
};

rivets.formatters.menos = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return toFloat(value) - (args.reduce(function(a, b) {
            return toFloat(a) + toFloat(b);
        }, 0));
};

rivets.formatters.plus = function(value) {
    var args = Array.prototype.slice.call(arguments, 1)
        , mult = args.reduce(function(a, b) {
            return toFloat(a) * (toFloat(b) ? toFloat(b) : 1);
        }, toFloat(value))
        ;
    return mult;
};

rivets.formatters.money = function(value){
    return (value != undefined ? value.toMoney() : '');
}

rivets.formatters.float = function(value){
    return (value != undefined ? value.toFloat() : '');
}

rivets.formatters.int = function(value){
    return (value != undefined ? value.toInt() : '');
}

rivets.formatters.menorQueZero = function(value){
    return (toFloat(value) < 0 ? true : false);
}

rivets.formatters.maiorQueZero = function(value){
    return (toFloat(value) > 0 ? true : false);
}

rivets.formatters.clearIfEmpty = function(value){
    return (value == "" ? null : value);
}

rivets.formatters.clearIfEmptyOrZero = function(value){
    return (value == "" || value == "0" || value == "0,00" ? null : value);
}

rivets.formatters.igualA = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (value == args[0]);
};
rivets.formatters.diffDe = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (value != args[0]);
};

rivets.formatters.in = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (args.indexOf(value) > -1);
};
rivets.formatters.notIn = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (args.indexOf(value) == -1);
};

rivets.formatters.or = function(value) {
    return (arguments[0] ? arguments[0] : arguments[1]);
};

rivets.formatters.not = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return !value;
};


rivets.adapters['#'] = {
    observe: function(obj, keypath, callback) {
        $(obj).on('change:' + keypath, callback);
        console.log(1);
    },
    unobserve: function(obj, keypath, callback) {
        $(obj).off('change:' + keypath, callback);
        console.log(2);
    },
    get: function(obj, keypath) {
        return $(obj).get(keypath);
        console.log(3);
    },
    set: function(obj, keypath, value) {
        $(obj).set(keypath, value);
        console.log(4);
    }
};
*/

//endregion
/**
 * Created by labs on 22/03/16.
 */

var Seriate = require('seriate');


function SQL(connParams){

    // Conexão
    Seriate.setDefaultConfig({
        name    : 'default',
        server  : connParams['host'],
        user    : connParams['user'],
        password: connParams['pwd'],
        database: connParams['database'],
        pool: {
            max: 10,
            min: 4,
            idleTimeoutMillis: 30000
        }
    });
}

SQL.prototype.load = function(){

    // Executa
    return function *load(next) {
        return Seriate.execute({
                query: "select * from owhs"
            })
            .then(
                // OK
                function (results) {
                    return results;
                },

                // Erro
                function (err) {
                    return err;
                }
            );
    }
};




// Exporta
module.exports = SQL;
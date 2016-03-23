/**
 * TShark - Client 3.0
 * Funcionalidades de interface: Mapeamento de cliente
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('default.map.filiais', {

    /**
     * Permite extender uma classe
     */
    extends: 'configuracoes',

    /**
     * Inicialização do módulo
     */
    init: function(){
        this.info = {
            titulo: 'Mapeamento de Filiais',
            info: 'Filiais mapeadas',
            help: '',
            icon: 'lab icon'
        };
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     *
    onAfterList: function(response){
        configuracoes.onListExec(this, response);
    }*/

});
//# sourceURL=default.map.filiais.js
/**
 * TShark - Client 3.0
 * Funcionalidades de interface: Menus da aplicação
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('app.menu', {

    // Armazena a última área ativa
    old_area: "tarefas",

    /**
     * Inicializa o menu
     */
    init: function(){

        // Efetua o bind do menu
        rivets.bind($('.menu-principal'), this);

        // Carga de dados
        this.load('app menu');
    },

    /**
     * Clique do menu
     */
    click: function(){

        // Esconde a área atual
        $("#" + client.menu.old_area).css('display', 'none');

        // Exibe a nova
        client.menu.old_area = $(this).data('area');
        $("#" + client.menu.old_area).css('display', 'block');

    }

});

//# sourceURL=app.menu.js
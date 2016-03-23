/*
 * Menu da aplicação
 */
var
    // Menu de tarefas
    tarefas = {
        label: "Tarefass",
        area: "tarefas",
        icon: "checkmark icon",
        api: "list default map clientes",
        submenu: [
            {
                label: "Um"
            },
            {
                label: "Dois"
            },
            {
                label: "Tres"
            }
        ]
    }

    // Menu de integrações
    , integracoes = {
        label: "Integrações",
        area: "integracoes",
        icon: "sitemap icon",
        submenu: [
            {
                label: "Itens"
            }
        ]
    }

    // Menu de cartões
    , cartoes = {
        label: "Cartões",
        area: "cartoes",
        icon: "comments outline icon",
        api: "lista blueone map map_itens",
        submenu: [
        ]
    }

    // Menu de Acesso
    , acesso = {
        label: "Perfis e Acesso",
        area: "acesso",
        icon: "user icon",
        submenu: [
        ]
    }

    // Menu de configurações
    , config = {
        label: "Configurações",
        area: "configuracoes",
        icon: "settings icon",
        submenu: [
            { label: "Filiais",                 api: "list default map filiais" },
            { label: "Grupos de Item",          api: "" },
            { label: "Itens2",                   api: "list default map itensee" },
            { label: "Clientes",                api: "list default map clientes" },
            { label: "Fornecedores",            api: "" },
            { label: "Funcionarios",            api: "" },
            { label: "Formas de Pagamento",     api: "" },
            { label: "Cenários Contábeis",      api: "" },
            { label: "Global",                  api: "" }
        ]
    }
;


// Exporta o menu
module.exports = {
    rows: [
        tarefas,
        integracoes,
        cartoes,
        acesso,
        config
    ]
};
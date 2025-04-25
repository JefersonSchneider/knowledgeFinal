const { WebhookClient } = require('dialogflow-fulfillment');
const db = require('../config/db'); // Importa a instância do Knex diretamente

module.exports = app => {
    app.post('/webhook', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        // Função para lidar com o Default Welcome Intent
        function handleWelcomeIntent(agent) {
            agent.add('Olá! Bem-vindo ao KnowledgeBot! Como posso te ajudar?');
        }

        // Função para lidar com o StatsIntent
        async function handleStatsIntent(agent) {
            try {
                // Contar os documentos diretamente nas tabelas do PostgreSQL
                const usersCountResult = await db('users').count('* as count').first();
                const categoriesCountResult = await db('categories').count('* as count').first();
                const articlesCountResult = await db('articles').count('* as count').first();

                const usersCount = parseInt(usersCountResult.count) || 0;
                const categoriesCount = parseInt(categoriesCountResult.count) || 0;
                const articlesCount = parseInt(articlesCountResult.count) || 0;

                // Montar a resposta com base nos dados
                const reply = `Aqui estão as estatísticas da base de conhecimento:\n- Usuários: ${usersCount}\n- Categorias: ${categoriesCount}\n- Artigos: ${articlesCount}`;
                agent.add(reply);
            } catch (error) {
                console.error('Erro ao buscar estatísticas no PostgreSQL:', error);
                agent.add('Desculpe, não consegui buscar as estatísticas no momento. Tente novamente mais tarde.');
            }
        }

        // Mapear os intents às funções
        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', handleWelcomeIntent);
        intentMap.set('StatsIntent', handleStatsIntent);
        agent.handleRequest(intentMap);
    });
};
const knex = require('knex');

// Carrega a configuração do ambiente 'development'
const config = require('../knexfile');
console.log('Configuração do Knex:', config); // Log para depuração

// Inicializa o Knex com a configuração
const db = knex(config);

module.exports = db;
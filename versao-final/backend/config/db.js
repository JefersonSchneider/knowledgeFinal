const knex = require('knex');

// Carrega a configuração do ambiente 'development'
const config = require('../knexfile').development;

// Inicializa o Knex com a configuração
const db = knex(config);

module.exports = db;
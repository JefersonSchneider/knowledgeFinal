require('dotenv').config();

const config = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.LOCAL_DB_HOST || 'localhost',
      port: process.env.LOCAL_DB_PORT || 5432,
      database: process.env.LOCAL_DB_NAME || 'knowledge_final',
      user: process.env.LOCAL_DB_USER || 'postgres',
      password: process.env.LOCAL_DB_PASSWORD || '123456',
      acquireConnectionTimeout: 10000,
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.CLOUD_DB_HOST || 'knowledge.cltrtygapwmf.us-east-1.rds.amazonaws.com',
      port: process.env.CLOUD_DB_PORT || 5432,
      database: process.env.CLOUD_DB_NAME || 'knowledge',
      user: process.env.CLOUD_DB_USER || 'postgres',
      password: process.env.CLOUD_DB_PASSWORD || 'pucminas2025',
      acquireConnectionTimeout: 10000,
      ssl: {
        rejectUnauthorized: false, // Necessário para o Aurora, que usa SSL
      },
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

// Exporta apenas a configuração do ambiente selecionado
// Forçar a configuração de production
module.exports = config.production; // Alterado para sempre usar production
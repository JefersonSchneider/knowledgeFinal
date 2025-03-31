const { db } = require('./.env');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      ...db,
      acquireConnectionTimeout: 10000 // Ajuste o tempo conforme necessário (em milissegundos)
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations' // Especifica o diretório das migrações
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      ...db,
      acquireConnectionTimeout: 10000 // Ajuste o tempo conforme necessário (em milissegundos)
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations' // Especifica o diretório das migrações
    }
  }
};
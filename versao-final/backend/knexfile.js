require('dotenv').config();

const localDb = {
  host: process.env.LOCAL_DB_HOST,
  port: process.env.LOCAL_DB_PORT,
  database: process.env.LOCAL_DB_NAME,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD
};

const cloudDb = {
  host: process.env.CLOUD_DB_HOST,
  port: process.env.CLOUD_DB_PORT,
  database: process.env.CLOUD_DB_NAME,
  user: process.env.CLOUD_DB_USER,
  password: process.env.CLOUD_DB_PASSWORD
};

// Define qual conexão usar com base no ambiente
const connection = process.env.NODE_ENV === 'production' ? cloudDb : localDb;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      ...connection,
      acquireConnectionTimeout: 10000
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      ...connection,
      acquireConnectionTimeout: 10000
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};

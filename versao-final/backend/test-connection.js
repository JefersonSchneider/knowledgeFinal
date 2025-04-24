const knex = require('knex')(require('./knexfile'));

async function testConnection() {
  try {
    await knex.raw('SELECT 1');
    console.log('Conexão bem-sucedida!');
    const currentDb = await knex.raw('SELECT current_database()');
    console.log('Banco atual:', currentDb.rows[0].current_database);
    const tables = await knex.raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tabelas no banco:', tables.rows);
  } catch (error) {
    console.error('Erro ao conectar:', error.message);
  } finally {
    await knex.destroy();
  }
}

testConnection();
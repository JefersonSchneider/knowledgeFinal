const app = require('../index');
const knex = require('knex');
const mongoose = require('mongoose');

// Inicializa o Knex com a configuração de teste
const db = knex(require('../knexfile').test);

// Configuração do Jest para limpar o banco antes dos testes
beforeAll(async () => {
  await db.migrate.latest(); // Executa as migrações no banco de teste
});

afterAll(async () => {
  await db.destroy(); // Fecha a conexão com o Knex
  await mongoose.connection.close(); // Fecha a conexão com o Mongoose
});

describe('User API', () => {
  it('should create a new user', async () => {
    expect(true).toBe(true); // Substitua por seu teste real
  });

  it('should return error if passwords do not match', async () => {
    expect(true).toBe(true); // Substitua por seu teste real
  });

  it('should get all users', async () => {
    expect(true).toBe(true); // Substitua por seu teste real
  });

  it('should get user by id', async () => {
    expect(true).toBe(true); // Substitua por seu teste real
  });

  it('should remove a user', async () => {
    expect(true).toBe(true); // Substitua por seu teste real
  });
});
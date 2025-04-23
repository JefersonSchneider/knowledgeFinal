const validation = require('../api/validation'); // Importe o arquivo de validação

describe('Testando funções de validação', () => {
  let validator;

  beforeAll(() => {
    validator = validation(); // Inicialize a função de validação
  });

  it('deve lançar erro quando o valor não existir (existsOrError)', () => {
    // Teste com valor vazio
    expect(() => validator.existsOrError('', 'Valor obrigatório')).toThrow('Valor obrigatório');
    
    // Teste com valor nulo
    expect(() => validator.existsOrError(null, 'Valor obrigatório')).toThrow('Valor obrigatório');
    
    // Teste com array vazio
    expect(() => validator.existsOrError([], 'Valor obrigatório')).toThrow('Valor obrigatório');
    
    // Teste com string em branco
    expect(() => validator.existsOrError('   ', 'Valor obrigatório')).toThrow('Valor obrigatório');
  });

  it('não deve lançar erro quando o valor existir (existsOrError)', () => {
    // Teste com valor válido
    expect(() => validator.existsOrError('Valid Value', 'Valor obrigatório')).not.toThrow();
    expect(() => validator.existsOrError([1], 'Valor obrigatório')).not.toThrow();
  });

  it('deve lançar erro quando o valor existir (notExistsOrError)', () => {
    // Teste com valor válido
    expect(() => validator.notExistsOrError('Valid Value', 'Valor já existe')).toThrow('Valor já existe');
  });

  it('não deve lançar erro quando o valor não existir (notExistsOrError)', () => {
    // Teste com valor vazio
    expect(() => validator.notExistsOrError('', 'Valor já existe')).not.toThrow();
    expect(() => validator.notExistsOrError(null, 'Valor já existe')).not.toThrow();
    expect(() => validator.notExistsOrError([], 'Valor já existe')).not.toThrow();
  });

  it('deve lançar erro quando os valores não forem iguais (equalsOrError)', () => {
    // Teste com valores diferentes
    expect(() => validator.equalsOrError(1, 2, 'Valores diferentes')).toThrow('Valores diferentes');
  });

  it('não deve lançar erro quando os valores forem iguais (equalsOrError)', () => {
    // Teste com valores iguais
    expect(() => validator.equalsOrError(1, 1, 'Valores diferentes')).not.toThrow();
  });
});

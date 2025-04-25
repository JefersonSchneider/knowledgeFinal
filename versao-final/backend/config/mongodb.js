const mongoose = require('mongoose');

// Usa a variável de ambiente MONGODB_URI injetada pelo Elastic Beanstalk
// Fallback para localhost apenas para testes locais
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/knowledge_db';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');
  })
  .catch(e => {
    const msg = 'ERRO! Não foi possível conectar com o MongoDB!';
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m', e);
  });

module.exports = mongoose;
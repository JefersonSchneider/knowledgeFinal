const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

require('./config/mongodb');

app.db = db;
app.mongoose = mongoose;

// Configuração do CORS para permitir requisições do frontend (localhost e S3)
app.use(cors({
  origin: [
    'http://localhost:8080', // Para desenvolvimento local
    'http://192.168.3.12:8080', // Para testes na rede local
    'http://meu-vuejs-knowledge.s3-website-us-east-1.amazonaws.com' // Para produção no S3
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Se precisar enviar cookies ou credenciais
}));

// Middleware para logar requisições e cabeçalhos CORS
app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  console.log(`Origem da requisição: ${req.headers.origin}`);
  res.on('finish', () => {
    console.log(`Cabeçalho CORS retornado: Access-Control-Allow-Origin = ${res.get('Access-Control-Allow-Origin')}`);
  });
  next();
});

// Configurações do Consign
const consignConfig = consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js');

// Condicionalmente carrega o diretório 'schedule' apenas se não for ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  //consignConfig.then('./schedule');
}

consignConfig.into(app);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Backend executando na porta ${PORT}...`);
  });
}
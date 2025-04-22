const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const mongoose = require('mongoose');
require('dotenv').config();

require('./config/mongodb');

app.db = db;
app.mongoose = mongoose;

// Configurações do Consign
const consignConfig = consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js');

// Condicionalmente carrega o diretório 'schedule' apenas se não for ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  consignConfig.then('./schedule');
}

consignConfig.into(app);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Backend executando na porta ${PORT}...`);
  });
}
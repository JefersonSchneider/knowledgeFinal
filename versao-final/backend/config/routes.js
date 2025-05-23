const admin = require('./admin');

module.exports = app => {
  // Rotas de autenticação (comentar todas)
  // app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  // app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
    // .all(app.config.passport.authenticate()) // Remover autenticação
    //.post(admin(app.api.user.save))
    //.get(admin(app.api.user.get));
    .post(app.api.user.save)
    .get(app.api.user.get);

  app.route('/users/:id')
    // .all(app.config.passport.authenticate()) // Já estava comentado
    .put(app.api.user.save)
    .get(app.api.user.getById)
    //.get(app.api.user.getById) // Removido o duplicado
    .delete(app.api.user.remove);

  app.route('/categories')
    // .all(app.config.passport.authenticate())
    //.get(admin(app.api.category.get))
    //.post(admin(app.api.category.save));
    .get(app.api.category.get)
    .post(app.api.category.save);

  // Cuidado com ordem! Tem que vir antes de /categories/:id
  app.route('/categories/tree')
    // .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

  app.route('/categories/:id')
    // .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    //.put(admin(app.api.category.save))
    //.delete(admin(app.api.category.remove));
    .put(app.api.category.save)
    .delete(app.api.category.remove);

  app.route('/articles')
    // .all(app.config.passport.authenticate())
    //.get(admin(app.api.article.get))
    //.post(admin(app.api.article.save));
    .get(app.api.article.get)
    .post(app.api.article.save);

  app.route('/articles/:id')
    // .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    //.put(admin(app.api.article.save))
    //.delete(admin(app.api.article.remove));
    .put(app.api.article.save)
    .delete(app.api.article.remove);

  app.route('/categories/:id/articles')
    // .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);

  app.route('/stats')
    // .all(app.config.passport.authenticate())
    .get(app.api.stat.get);

  // Endpoint temporário para listar os modelos registrados no Mongoose
  app.get('/models', (req, res) => {
    res.json(Object.keys(app.mongoose.models));
  });

  // Adicionando o webhook para o Dialogflow
  require('../api/webhook')(app);
};
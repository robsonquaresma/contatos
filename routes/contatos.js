var auth = require('../middlewares/auth');

module.exports = function(app) {
  var contato = app.controllers.contatos;

  app.route('/contatos/:id').get(auth, contato.index);

  app.route('/contatos/create/:id')
    .get(auth, contato.create)
    .post(auth, contato.store);
}

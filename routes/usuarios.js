var auth = require('../middlewares/auth');

module.exports = function(app) {

  var usuarios = app.controllers.usuarios;

  app.route('/usuarios').get(auth, usuarios.index);

  app.route('/usuarios/create')
    .get(auth, usuarios.create)
    .post(auth, usuarios.post);

  app.route('/usuarios/show/:id').get(auth, usuarios.show);

  app.route('/usuarios/remove/:id')
    .get(auth, usuarios.remove)
    .post(auth, usuarios.remove);

  app.route('/usuarios/edit/:id')
    .get(auth, usuarios.edit)
    .post(auth, usuarios.update);

}

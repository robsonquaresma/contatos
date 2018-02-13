module.exports = function(app) {
  var usuarios = app.controllers.usuarios;
  app.route('/usuarios').get(usuarios.index);
  app.route('/usuarios/create')
    .get(usuarios.create)
    .post(usuarios.post);
  app.route('/usuarios/show/:id').get(usuarios.show);
  app.route('/usuarios/remove/:id').post(usuarios.remove).get(usuarios.remove);
  app.route('/usuarios/edit/:id')
    .get(usuarios.edit)
    .post(usuarios.update);

}

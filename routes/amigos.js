var auth = require('../middlewares/auth');

module.exports = function(app) {

  var amigos = app.controllers.amigos;

  app.route('/amigos').get(auth, amigos.index);

  app.route('/amigos/create')
    .get(auth, amigos.create)
    .post(auth, amigos.store);

  app.route('/amigos/edit/:id')
    .get(auth, amigos.edit)
    .post(auth, amigos.update);

  app.route('/amigos/remove/:id')
    .get(auth, amigos.remove)
    .post(auth, amigos.remove);
}

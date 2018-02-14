module.exports = function(app) {
  var auth = require('../middlewares/auth');
  var home = app.controllers.home;
  app.route('/').get(home.login).post(home.auth);
  app.route('/home').get(auth, home.index);
  app.route('/logout').get(home.logout);
}

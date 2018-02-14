var auth = require('../middlewares/auth');

module.exports = function(app) {

  var home = app.controllers.home;

  app.route('/').get(home.login).post(home.auth);
  app.route('/home').get(auth, home.index);
  app.route('/logout').get(home.logout);

  app.route('/email')
    .get(auth, home.email)
    .post(auth, home.sendmail);
}

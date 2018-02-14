module.exports = function(app) {
  var Usuario = app.models.usuarios;
  var validator = require('../validations/login');

  var HomeController = {
    index: function(req, res) {
      res.render('home/index');
    },

    login: function(req, res) {
      res.render('home/login');
    },

    auth: function(req, res) {
      var usuario = new Usuario();
      var email   = req.body.email;
      var senha   = req.body.senha;

      if (validator(req, res)) {
        Usuario.findOne({'email': email}, function(err, data) {
          if (err) {
            req.flash('erro', 'Erro ao entrar no sistema.');
            res.redirect('/');
          } else if (!data) {
            req.flash('erro', 'E-mail e/ou Senha não cadastrado(s).');
            res.redirect('/');
          } else if (!usuario.validPassword(senha, data.senha)) {
            req.flash('erro', 'E-mail e/ou Senha não cadastrado(s).');
            res.redirect('/');
          } else {
            req.session.usuario = data;
            res.redirect('/home');
          }
        });
      } else {
        res.redirect('/');
      }
    },

    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  }

  return HomeController;
}

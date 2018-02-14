var nodemailer = require('nodemailer');

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
    },

    email: function(req, res) {
      res.render('home/email');
    },

    sendmail: function(req, res) {
      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7be9a0d94a5551",
          pass: "186a8bd231eed8"
        }
      });

      // configurando o envio do email
      var mailOptions = {
          from: req.body.nome + ' <' + req.body.email + '>', // sender address
          to: 'robquaresma@gmail.com', // list of receivers
          subject: req.body.assunto, // Subject line
          text: req.body.mensagem //, // plain text body
          //html: '<b>Hello world?</b>' // html body
      };

      transport.sendMail(mailOptions, function(err, response) {
        if (err) {
          req.flash('erro', 'Erro ao enviar o email: ' + err);
          res.redirect('/email');
        }

        req.flash('info', 'E-mail enviado com sucesso!');
        res.render('home/email');
      });

    }
  }

  return HomeController;
}

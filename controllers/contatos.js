var validator = require('../middlewares/auth');

module.exports = function(app) {

  var Amigos = app.models.amigos;
  var ContatoController = {
    index: function(req, res) {
      var _id = req.params.id;

      Amigos.findById(_id, function(err, dados) {
        if (err) {
          req.flash('erro', 'Erro ao carregar contatos. Erro: ' +err);
          res.render('contatos/index', {lista: null});
        } else {
          res.render('contatos/index', {lista: dados.contatos, id: _id});
        }
      });
    },

    create: function(req, res) {
      res.render('contatos/create', {model: new Amigos(), id: req.params.id});
    },

    store: function(req, res) {
      var _id = req.params.id;

      Amigos.findById(_id, function(err, dados) {
        console.log(dados);
        var contato = req.body;
        dados.contatos.push(contato);

        dados.save(function(err) {
          if (err) {
            req.flash('erro', 'Erro ao salvar o contato. Erro: ' + err);
          } else {
            req.flash('info', 'Registro inserido com sucesso!');
          }
          res.redirect('/contatos/' + _id);
        });
      });
    },

    remove: function(req, res) {
    }
  }

  return ContatoController;

}

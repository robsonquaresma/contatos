var validator = require('../validations/amigos');

module.exports = function(app) {

  var Amigos = app.models.amigos;

  var AmigosController = {
    index: function(req, res) {
      Amigos.find(function(err, dados) {
        if (err) {
          req.flash('erro', 'Erro ao carregar: ' + err);
          res.render('amigos/index', {lista: null});
        }
        res.render('amigos/index', {lista: dados})
      });
    },

    create: function(req, res) {
      res.render('amigos/create', {model: new Amigos()});
    },

    store: function(req, res) {
      if (validator(req, res)) {
        var model = new Amigos();
        model.nome = req.body.nome;
        model.email = req.body.email;

        model.save(function(err) {
          if (err) {
            req.flash('erro', 'Erro ao inserir o registro');
            res.render('amigos/create', {model: model});
          }

          req.flash('info', 'Dados salvos com sucesso!');
          res.redirect('/amigos');
        });
      } else {
        res.render('amigos/create', {model: req.body});
      }
    },

    remove: function(req, res) {
      Amigos.remove({_id: req.params.id}, function(err) {
        if (err) {
          req.flash('erro', 'Erro ao excluir o registro.');
        } else {
          req.flash('info', 'Registro excluído com sucesso!');
        }
        res.redirect('/amigos');
      });
    },

    edit: function(req, res) {
      Amigos.findById(req.params.id, function(err, dados) {
        if (err) {
          req.flash('erro', 'Erro ao carregar amigo. Erro: ' +err);
          res.redirect('/amigos');
        }
        res.render('amigos/edit', {model: dados});
      });
    },

    update: function(req, res) {
      if (validator(req, res)) {
        Amigos.findById(req.params.id, function(err, dados) {
          if (err) {
            req.flash('erro', 'Erro ao atualizar o registro.');
            res.render('amigos/edit', {model: req.body});
          } else {
            var model = dados;
            model.nome = req.body.nome;
            model.email = req.body.email;

            model.save(function(err) {
              if (err) {
                req.flash('erro', 'Erro ao atualizar o registro.');
                res.render('amigos/edit', {model: model});
              } else {
                req.flash('info', 'Registro atualizado com sucesso!');
                res.redirect('/amigos');
              }
            });
          }
        });
      }
    }

  }

  return AmigosController;
}

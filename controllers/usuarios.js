module.exports = function(app) {
  var validator = require('../validations/usuarios');
  var Usuario = app.models.usuarios;

  var UsuarioController = {
    index: function(req, res) {
      Usuario.find(function(err, dados){
        if (!err) {
          res.render('usuarios/index', {lista: dados});
        } else {
          req.flash('erro', 'Erro ao buscar usuários: ' + err);
          res.redirect('/usuarios');
        }
      });
    },
    create: function(req, res) {
      res.render('usuarios/create', {user: new Usuario()});
    },

    post: function(req, res) {
      if (validator(req, res)) {
        var model   = new Usuario();
        model.nome  = req.body.nome;
        model.email = req.body.email;
        model.site  = req.body.site;
        model.senha = model.generateHash(req.body.senha);

        Usuario.findOne({'email': model.email}, function(err, data) {
          if (data) {
            req.flash('erro', 'Este e-mail já está cadastrado, tente outro.');
            res.render('usuarios/create', {user: model});
          } else {
            //Ou podemos fazer simplesmente assim: var model =,new Usuario(req.body);
            //salvando os dodos na base
            model.save(function(err) {
              if (err) {
                req.flash('erro', 'Houve um erro ao tentar cadastrar o usuário. Erro: ' + err);
                res.render('usuarios/create', {user: req.body});
              } else {
                req.flash('info', 'Cadastro efetuado com sucesso!');
                res.redirect('/usuarios');
              }
            });
          }
        });

      } else {
        res.render('usuarios/create', {user: req.body});
      }
    },


    show: function(req, res) {
      Usuario.findById(req.params.id, function(err, dados) {
        if (err) {
          req.flash('erro', 'Erro ao visualizar usuário. Erro: ' + err);
          res.redirect('/usuarios');
        } else {
          res.render('usuarios/show', {dados: dados});
        }
      });
    },

    remove: function(req, res) {
      Usuario.remove({_id: req.params.id}, function(err) {
        if (err) {
          req.flash('erro', 'Houve um erro ao tentar excluir o usuário. Erro: ' + err);
          res.render('usuarios/create', {user: req.body});
        } else {
          req.flash('info', 'Exclusão efetuada com sucesso!');
          res.redirect('/usuarios');
        }
      });
    },

    edit: function(req, res) {
      Usuario.findById(req.params.id, function(err, dados) {
        if (err) {
          req.flash('erro', 'Usuário não encontrado. Erro: ' + err);
          res.redirect('/usuarios');
        } else {
          res.render('usuarios/edit', {dados: dados});
        }
      });
    },

    update: function(req, res) {
      if (validator(req, res)) {
        Usuario.findById(req.params.id, function(err, dados) {
          var model = dados;
          model.nome = req.body.nome;
          model.site = req.body.site;

          model.save(function(err) {
            if (err) {
              req.flash('erro', 'Erro ao editar. Erro: ' + err);
            } else {
              req.flash('info', 'Registro atualizado com sucesso!');
            }
            res.redirect('/usuarios');
          });
        });
      } else {
        res.render('usuarios/edit', {dados: dados});
      }
    }

  }

  return UsuarioController;
}

var url = require('url');

module.exports = function(req, res) {
  var createUrl = url.parse(req.url).pathname == '/usuarios/create';
  var updateUrl = !createUrl;

  req.assert('nome', 'Informe um nome').notEmpty();
  if (createUrl) {
    req.assert('email', 'E-mail inválido').isEmail();
    req.assert('senha', 'Sua senha deve ter entre 6 a 10 caracteres').len(6,10);

  }
  req.assert('site', 'Site não é um URL válida').isURL();

  var validateErrors = req.validationErrors() || [];

  if (createUrl && (req.body.senha != req.body.confirmacao_senha)) {
    validateErrors.push({msg: 'As senhas são diferentes'});
  }

  if (validateErrors.length > 0) {
    validateErrors.forEach(function(e) {
      req.flash('erro', e.msg);
    });
    return false;
  } else {
    return true;
  }

}

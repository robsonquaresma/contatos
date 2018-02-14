module.exports = function(req, res) {
  req.assert('email', 'E-mail inválido.').isEmail();
  req.assert('senha', 'Sua senha deve conter de 6 a 10 caracters.').len(6,10);

  var validationErrors = req.validationErrors() || [];

  if (validationErrors.length > 0) {
    validationErrors.forEach(function(e) {
      req.flash('erro', e.msg);
    });
    return false;
  }
  return true;
}

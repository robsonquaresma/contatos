module.exports = function (req, res) {

  req.assert('telefone', 'Informe seu telefone.').notEmpty();

  var validationErrors = req.validationErrors() || [];

  if (validationErrors.length > 0) {
    validationErrors.forEach(function(e) {
      req.flash('erro', e.msg);
    });
    return false;
  }
  return true;
}

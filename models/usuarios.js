var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt-nodejs');

module.exports = function() {
  var usuarioSchema = mongoose.Schema({
    nome:     {type: String, trim: true},
    email:    {type: String, trim: true, unique: true, index: true},
    site:     {type: String, trim: true},
    senha:    {type: String},
    datacad:  {type: Date, default: Date.now}
  });

  //criptografando a Senha
  usuarioSchema.methods.generateHash = function(senha) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
  };

  return mongoose.model('usuarios', usuarioSchema);
}

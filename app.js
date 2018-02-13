var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var consign       = require('consign');
var load          = require('express-load');
var session       = require('express-session');
var mongoose      = require('mongoose');
var flash         = require('express-flash');
var moment        = require('moment');
var validator     = require('express-validator');

//conexao com o bd
mongoose.connect('mongodb://localhost/acadtec', function(err) {
  if (err) {
    console.log('Erro ao conectar ao MongoDB: ' + err);
  } else {
    console.log('Conexão efetuada com sucesso!');
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser('quaresma'));
app.use(session({
  secret: 'aulasdenodejs009933',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

//helpers
app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});

load('models').then('controllers').then('routes').into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Página não encontrada!');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

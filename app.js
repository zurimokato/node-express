var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var tokenRouter = require('./routes/token');

//apis
var bicicletaApiRouter=require('./routes/api/bicicletas');
var userApiRouter=require('./routes/api/user');
var tokenApiRouter=require('./routes/api/token');

//mongoose
var moongose=require('mongoose');
var mongodb='mongodb://localhost/red-bicicletas';

moongose.connect(mongodb,{useNewUrlParser:true,useUnifiedTopology: true }).then( ()=>{console.log('Connected')}).
catch((err)=>{
  console.log('Error to conect '+err.message);
});

moongose.Promise=global.Promise;

var db=moongose.connection;

db.on('Error',console.error.bind(console,'MongoDB connection error:'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/token', tokenRouter);
//api
app.use('/api/bicicletas',bicicletaApiRouter);
app.use('api/users',userApiRouter);
app.use('api/token', tokenApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

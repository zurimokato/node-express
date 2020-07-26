require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Usuairo =require('./models/usuario');

//sesion
const passport = require('./config/passport');
const session=require('express-session');

//jwt

const jwt=require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var tokenRouter = require('./routes/token');

//apis
var bicicletaApiRouter=require('./routes/api/bicicletas');
var userApiRouter=require('./routes/api/user');
var tokenApiRouter=require('./routes/api/token');
var oauthApiRouter=require('./routes/api/oauth');
const token = require('./models/token');


//mongoose
var moongose=require('mongoose');
//var mongodb='mongodb://localhost/red-bicicletas';
var mongodb=process.env.MONGO_URI;
moongose.connect(mongodb,{useNewUrlParser:true,useUnifiedTopology: true }).then( ()=>{console.log('Connected')}).
catch((err)=>{
  console.log('Error to conect '+err.message);
});

moongose.Promise=global.Promise;

var db=moongose.connection;

db.on('Error',console.error.bind(console,'MongoDB connection error:'));

const store= new session.MemoryStore;

var app = express();

app.use(session({
  cookie:{maxAge:240*60*60*100},
  store:store,
  saveUninitialized:true,
  resave:'true',
  secret:'red_bicis_!!!****!"-!"-!"-!"-!"-!"-123123',
}));

app.set('secret-key','jwt_pwd_!!223334444');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login',function(req, res){
  res.render('session/login');
});

app.get('/google33ccaabccb16f403', function(req,res){
  res.sendfile(__dirname + '/views/google33ccaabccb16f403.html');
})

app.post('/login',function(req,res,next){
  //passport

  passport.authenticate('local', function(err, user, info){
    if(err) return next(err);
    if(!user) return res.render('/session/login', {info});
    req.logIn(user,function(err){
      if(err) return next(err);
      return res.redirect('/')
    });
  })(req,res,next);
});

app.get('/logout',function(req,res){

  req.logOut();
  res.redirect('/')
});

app.get('/forgotPassword', function(req,res){
  res.render('session/forgotPassword');
});

app.post('/forgotPassword',function(req,res){
  Usuairo.findOne({email:req.body.email},function(err,user){
    if(!user) return res.render('session/forgotPassword',{info:{menssage:'No se encontro usuario registrado con este email'}});
    user.resetPassword(function(err){
      console.log('session/forgotPassword');
    });
    res.render('session/forgotPasswordMessage');
   });
});

app.get('/session/resetPassword/:token',function(req,res, next){
  token.findOne({token:req.params.token},function(err, token){
    if(!token) return res.status(400).send({type:'not-verfied',msg:''});
    console.log(token);
    Usuairo.findById({_id:token._userId},function(err,user){
      if(!user){return res.status(400).send({msg:'No existe registro del usuario'});
    }else{
      res.render('session/resetPassword',{usuario:user});
    }
    });
  });
});

app.post('/session/resetPassword',function(req,res){
  if(req.body.password != req.body.confirm_password) { 
    res.render('session/resetPassword',{errors:{confirm_password:{message:'las contraseñas deben ser iguales'}}});
    return;
  }
  Usuairo.findOne({email:req.body.email},function(err,user){
    user.password=req.body.password;
    user.save(function(err){
      if(err) {
        return res.render('session/resetPassword',{errors:err.errors, usuario:new Usuairo('error','error','error')});
      }else{
        res.redirect('/login')
      }
    });
  })
});

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/bicicletas',loggedIn, bicicletasRouter);
app.use('/token', tokenRouter);
//api
app.use('/api/bicicletas', validarUsuario,bicicletaApiRouter);
app.use('/api/users',userApiRouter);
app.use('/api/token', tokenApiRouter);
app.use('/api/oauth', oauthApiRouter);


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

function loggedIn(req, res, next){
  if(req.user){
    next()
  }else{
    console.log('user sin logeaser');
    res.redirect('/login');
  }
}

function validarUsuario(req, res, next){
  jwt.verify(req.headers['x-acces-token'], req.app.get('secretKey'), function(err, decoded){
    if(err){
      res.json({status: "error", message: err.message, data: null});

    }else{
      req.body.userId = decode.id;

      console.log ('jwt verify: '+  decoded );  
      next();
    }
  });
}

module.exports = app;

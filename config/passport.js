const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
var Usuario= require('../models/usuario');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use( new LocalStrategy(
    function(email, password, done){
        Usuario.findOne({email:email},(err, user)=>{
            console.log(user)
            if(err) return done(err);
            if(user ==null) return done(null, false,{info:{message:"Email no existe o es incorrrecto"}});
            if (!user.validPassword(password)) return done(null, false, {info:{message:'La contraseña no es valida'}});

            return done(null, user);
        });
    }
));



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST+"auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    Usuario.findOrCreateByGoogle({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user,cb){
    cb(null,user._id);
});

passport.deserializeUser(function(id,cb){
    Usuario.findById(id,function(err, usuario){
        cb(err, usuario)
    })
})

module.exports=passport;
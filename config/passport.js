const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
var Usuario= require('../models/usuario');


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

passport.serializeUser(function(user,cb){
    cb(null,user._id);
});

passport.deserializeUser(function(id,cb){
    Usuario.findById(id,function(err, usuario){
        cb(err, usuario)
    })
})

module.exports=passport;
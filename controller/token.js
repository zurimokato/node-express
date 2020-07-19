var Usuario = require('../models/usuario');
var Token= require('../models/token');


module.exports={
    confirmationGet: function(req,res,next){
        Token.findOne({token:req.params.token},function(err, token){
            if(!token){
                return res.status(400).send({type:'no verified', msg:'No se ha podido verificar el usuario'});
            }
            Usuario.findById(token._userId, function(err, user){
                if(!user) return res.status(400).send({msg:'no encontramos un usario'});
                if(user.verificado) return res.redirect('/usuarios');
                user.verificado=true;
                user.save(function(err){
                    if(err) return res.status(500).send({msg:err.message})
                   res.redirect('/');
                });
            });
        });
    }
}
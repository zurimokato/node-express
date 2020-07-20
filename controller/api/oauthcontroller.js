const Usuario =require('../../models/usuario');
const bycript= require('bcrypt');
const jwt= require('jsonwebtoken');


module.exports={
    authenticate:function(req,res, next){
        Usuario.findOne({email:req.body.email}, function(err, user){
            if(err) {next(err)}
            else{
                if(user ===null){return res.estatus(400).json({status:400, messagge:'usuario no encontrado',data:null})}
                if(user !=null && bycript.compareSync(req.body.password, user.password)){
                    user.save(function(err,usuario){
                        const token=jwt.sign({id:usuario._id}, req.app.get('secret-key'), {expiresIn:'7d'});
                        res.status(200).json({messagge:'usuario encontrado', data:{usuario:usuario,token:token}});

                    });
                }else{
                    res.estatus(401).json({status:'errror', messagge:'Invalido email/password', data:null});
                }
            }

        })
    },
    forgotPassword:function(req,res, next){
        Usuario.findOne({email:req.body.email}, function(err, user){
            if(!user)return res.status(401).json({messagge:'No Exsite el usuario', data:null});
            user.resetPassword(function(err){
                if(err) {return next(err)}
                res.status(200).json({messagge:'Se ha enviado un email para resutablecer la contraseña', data:null})
            })
        })
    }
}
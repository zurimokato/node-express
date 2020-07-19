var Usuario = require('../models/usuario');

exports.user_list=function(req,res){
    Usuario.allUsers((err, users)=>{
        if(err) console.log(err);

        res.render('usuarios/index',{usuarios:users})
    })
}

exports.user_create_get=function(req, res){
    let usario= Usuario.createInstance('','','');

    console.log(typeof(usuarios))
    res.render('usuarios/create',{usuario:usario})
}

exports.user_create_post=function(req,res){
    var user = Usuario.createInstance(req.body.nombre, req.body.email,req.body.password);
    Usuario.add(user,(err,user)=>{
        if(err) console.log(err);   
        return res.redirect('/usuarios');
    });
}

exports.user_delete=function(req,res){
    
}

exports.user_update_post=function(req,res){
    
}
exports.user_update_get=function(req,res){

}
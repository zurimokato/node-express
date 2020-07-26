var Usuario = require('../../models/usuario');
const OK = 200;

exports.usuarios_list = function(req,res){
    Usuario.find({},function(err,usuarios){
        res.status(OK).json({
            usuarios :usuarios
        });
    });
};

exports.usuarios_create = function(req, res){
    var usuario = new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password});

    usuario.save(function(err){
        if(err) return res.status(500).json(err);
        res.status(OK).json(usuario);
    });
};

exports.usuario_reservar = function(req, res){
    Usuario.findById(req.body.id, function(err, usuario){
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err){
            console.log('Reserva!!!');
            res.status(OK).send();
        });
    });
};
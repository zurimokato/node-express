var Bicicleta =require('../../models/bicicleta');




exports.bicicleta_list=function(req,res){
   Bicicleta.allBicis((err,bicicletas)=>{
        if(err) console.log(err);
        
        res.send(bicicletas);
    })
}

exports.bicicleta_create=function(req,res){
   
    
    var abici=Bicicleta.createInstance(req.body.id,req.body.color,req.body.modelo, [req.body.lat,req.body.lng]);
    console.log(abici);
    Bicicleta.add(abici, (err, bici)=>{
        if(err) console.log(err);

        res.status(200).json({bicileta:bici});
    });
}

exports.bicicleta_find=function(req, res){
    Bicicleta.findByCode(req.params.id, (err, bici)=>{
        if(err)console.log(err);

        res.status(200).json({bicilceta:bici})
    })
}

exports.bicicleta_delete=function(req,res){
    var bici=Bicicleta.removeByCode(req.params.id,(err,data)=>{
        if(err)console.log(err);

        res.status(204).send("Se eliminó la bicicleta "+req.params.id);
    });
}


exports.bicicleta_update=function(req,res){
    var bici=Bicicleta.findByCode(req.params.id,(err, bici)=>{
        if(err)console.log(err);

        return bici;
    });
    bici.code=req.params.id;
    bici.modelo=req.body.modelo;
    bici.color=req.body.color;
    bici.ubicacion=[req.body.lat,req.body.lng];
    Bicicleta.updateByCode(req.params.id,bici,(err, update)=>{
        if(err)console.log(err);

        res.status(200).send(update)
    });
}
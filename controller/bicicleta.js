var Bicicleta=require('../models/bicicleta');
exports.bicicleta_list =function(req,res){
    
    Bicicleta.allBicis((err, bicis)=>{
        if(err) console.log(err)


        res.render('bicicletas/index',{bicis:bicis});
    });
    
   
}

exports.bicicleta_create_get=function(req,res){
    res.render('bicicletas/create');
}
exports.bicicleta_create_post=function(req,res){
    var bici = Bicicleta.createInstance(req.body.id, req.body.color,req.body.modelo)
    bici.ubicacion=[req.body.lat,req.body.lng]
    Bicicleta.add(bici,(err,bici)=>{
        if(err) console.log(err);

        return res.redirect('/bicicletas');
    });

   
}

exports.bicicleta_delete_post=function(req,res){
    Bicicleta.removeByCode(req.params.id,(err, result)=>{
        if(err)console.log(err);

        return res.redirect('/bicicletas');
    });

   
}

exports.bicicleta_update_get=function(req,res){
   
   var bici= Bicicleta.findByCode(req.params.id,(err,bici)=>{
        if(err) console.log(err);

        if(bici){
            return  res.render('bicicletas/update',{bici});
        }
   });
    
   

}
exports.bicicleta_update_post=function(req,res){
    Bicicleta.findByCode(req.params.id,(err,bici)=>{
        
        if(err) console.log(err);

        if(bici){
            bici.code=req.body.id;
            bici.modelo=req.body.modelo;
            bici.color=req.body.color;
            bici.ubicacion=[req.body.lat,req.body.lng]

            console.log(bici);
            Bicicleta.updateByCode(req.params.id, bici,(err, updated)=>{
                if(err) console.log(err);
        
                return res.redirect('/bicicletas');
            });
        }
    });

    
    
}
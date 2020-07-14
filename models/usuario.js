var mongoose=require('mongoose');
var Reserva=require('reserva')
var Schema=mongoose.Schema;


var usuarioSchema= new Schema({
    nombre:String,
});

usuarioSchema.method.reservar=function(bici,desde,hasta,cb){
    var reserva=new Reserva({usuario:this._id,bicicleta:bici,desde:desde,hasta:hasta});
    console.log(reserva);
    
}

module.exports=usuarioSchema;
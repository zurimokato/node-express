var moongose = require("mongoose");
var Schema = moongose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});

bicicletaSchema.method.toString = function () {
    return 'code: ' + this.code + ' color: ' + this.color + ' modelo: ' + this.modelo;
}

bicicletaSchema.statics.allBicis = function (cb) {
    return this.find({}, cb)
}

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code:code,
        color:color,
        modelo:modelo,
        ubicacion:ubicacion
    });
}


bicicletaSchema.statics.add=function(aBici, cb){
    return this.create(aBici,cb);
}

bicicletaSchema.statics.findByCode=function(code,cb){
    
    return this.findOne({code:code},cb);
}

bicicletaSchema.statics.removeByCode=function(code,cb){
    return this.deleteOne({code:code},cb);
}

bicicletaSchema.statics.updateByCode=function(id,aBici,cb){
    return this.findOneAndUpdate({code:id},{
        code:aBici.code,
        color:aBici.color,
        modelo:aBici.modelo,
        ubicacion:aBici.ubicacion
    }, cb);
}

module.exports = moongose.model('Bicicleta', bicicletaSchema)

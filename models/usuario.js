var mongoose=require('mongoose');
var Reserva=require('./reserva');
var crypto =require('crypto');
var Token =require('./token');
var mailer=require('../mailer/mailer');
const uniqueValidator=require('mongoose-unique-validator');
var Schema=mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds=10;

const validateEmail=function(email){
    const re=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
}

var usuarioSchema= new Schema({
    nombre:{
        type: String,
        trim:true,
        require:[true,"El nombre es Obligatorio"]
    },
    email:{
        type:String,
        trim:true,
        required:[true, "El email es obligatorio"],
        lowercase:true,
        validate:[validateEmail,'El email debe ser valido'],
        unique:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
    },
    password:{
        type:String,
        required:[true, 'El password es obligatorio']
    },
    passwordResetToken :String,
    passwordResetTokenExpired:Date,
    verificado:{
        type:Boolean,
        default:false
    }

});


usuarioSchema.plugin(uniqueValidator,{message:'el {PATH} ya existe con otro usuario.'});


usuarioSchema.statics.createInstance=function(nombre,email,password){
    return new this({nombre:nombre,email:email,password:password});
}

usuarioSchema.statics.add=function(usuairo,cb){
    return this.create(usuairo,cb);
}
usuarioSchema.statics.allUsers=function(cb){
    return this.find({},cb)
}
usuarioSchema.pre('save',function(next){
    if(this.isModified('password')){
        this.password=bcrypt.hashSync(this.password,saltRounds);
    }
    next();
});

usuarioSchema.method.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}


usuarioSchema.method.reservar=function(bici,desde,hasta,cb){
    var reserva=new Reserva({usuario:this._id,bicicleta:bici,desde:desde,hasta:hasta});
    console.log(reserva);
    
}

usuarioSchema.method.enviarEmail=function(cb){
    const token= new Token({_userId:this._id,token:crypto.randomBytes(16).toString('hex')});
    const emailDestination= this.email;
    token.save(function(err){
        if(err) return console.log(err);

        const emailOption={
            from: '"admin 👻" <noreply@example.com>', // sender address
            to: emailDestination, // list of receivers
            subject: "Verificacion de cuenta ✔", // Subject line
            text: "Hola n.n\n"+ "Por favor para verificar su cuenta de click en el siguiente link:\n"+ 'http://localhost:3000'+'\/token/confirmation/'+token.token+'\n', // plain text body
            html: "<b>Hello world?</b>"
        };

        mailer.sendMail(emailOption, function(err){
            if(err){return console.log(err)}


            console.log("verificacion email ha sido enviado a"+ emailDestination);
        })
    });
}
module.exports=mongoose.model('Usuario', usuarioSchema);
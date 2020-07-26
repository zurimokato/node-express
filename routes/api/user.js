var express =require("express");
var router=express.Router();
const usuarioController = require('../../controller/api/userController')


router.get('/',usuarioController.usuarios_list);
router.post('/create',usuarioController.usuarios_create);
router.post('/reservar',usuarioController.usuario_reservar);

module.exports=router;
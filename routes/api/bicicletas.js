var express =require("express");
var router=express.Router();
var biciController=require('../../controller/api/bicicletaController');

router.get('/',biciController.bicicleta_list);
router.get('/:id', biciController.bicicleta_find);
router.post('/create',biciController.bicicleta_create);
router.delete('/:id/delete',biciController.bicicleta_delete);

//update
router.patch('/:id/update',biciController.bicicleta_update);


module.exports=router;
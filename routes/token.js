var express=require('express');
var router=express.Router();
var tokenController=require('../controller/token');


router.get('/confirmation/:token', tokenController.confirmationGet);

module.exports=router;
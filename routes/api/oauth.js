const express= require('express');
const router= express.Router();

const oauthApiController=require('../../controller/api/oauthcontroller');



router.post('/authenticate', oauthApiController.authenticate);
router.post('/forgotPassword', oauthApiController.forgotPassword);


module.exports=router;
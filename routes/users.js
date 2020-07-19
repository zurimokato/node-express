var express = require('express');
var router = express.Router();
var userController = require('../controller/user');
/* GET users listing. */
router.get('/', userController.user_list);
router.get('/create', userController.user_create_get);
router.post('/create', userController.user_create_post);

router.post('/:id/delete',userController.user_delete)

router.get('/:id/update', userController.user_update_get);
router.post('/:id/update', userController.user_update_post);

module.exports = router;

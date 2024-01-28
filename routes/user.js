var express = require('express');
var router = express.Router();
const userController =  require('../controller/user')
const upload = require('../util/upload_')

// get
router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/user',userController.user)
router.get('/profile/:id',userController.profile)
router.get('/logout',userController.logout)
router.get('/editProfile/:id',userController.editProfile)


// post
router.post('/register',userController.post_register)
router.post('/delete_user',userController.delete_user)
router.post('/login',userController.post_login)
router.post('/editProfile/:id',upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'bg-image', maxCount: 1 }]),userController.post_editProfile)


module.exports = router
const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UserController');

router.post('/register',usersController.register )
router.post('/login', usersController.login)
router.get('/registerForm',usersController.registerForm)
router.get('/',usersController.loginForm)

module.exports=router
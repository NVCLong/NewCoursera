const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UserController');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/registerForm', usersController.registerForm);
router.get('/mailForm', usersController.mailForm);
router.post('/mailSend', usersController.mailSend);
router.get('/resetpassword/:username', usersController.resetPass);
router.put('/resetpassword/:id', usersController.updatePassword);
router.post('/logout', usersController.userLogout);
router.get('/', usersController.loginForm);

module.exports = router;

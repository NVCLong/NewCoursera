const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/MildewareController');
const messageController=require('../app/controllers/MessageController')


router.get('/', middlewareController.verifyToken, messageController.messagePage)


module.exports=router
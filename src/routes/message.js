const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/MildewareController');
const messageController = require('../app/controllers/MessageController');

router.get('/operation', messageController.opeChat);
router.get(
  '/academic',
  middlewareController.verifyToken,
  messageController.acaChat,
);
router.get(
  '/',
  middlewareController.verifyToken,
  messageController.messagePage,
);

module.exports = router;

const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const midlewareController = require('../app/controllers/MildewareController');
const { static } = require('express');

router.get(
  '/stored/courses',
  midlewareController.verifyToken,
  meController.stored,
);
router.get('/cv', midlewareController.verifyToken,meController.myCv)
module.exports = router;

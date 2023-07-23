const express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewController');
const middlewareController = require('../app/controllers/MildewareController');


router.get('/tech', middlewareController.verifyToken, newController.tech);
router.get('/job', middlewareController.verifyToken, newController.job);
router.get('/', middlewareController.verifyToken);


module.exports = router;

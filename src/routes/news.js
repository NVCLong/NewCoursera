const express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewController');

router.get('/tech', newController.tech);
router.get('/job', newController.job);

module.exports = router;

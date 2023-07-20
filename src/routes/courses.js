const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');
const {static} = require("express");

router.get('/create',coursesController.create)
router.post('/store',coursesController.store)
router.get('/:slug', coursesController.show);
router.get('/',coursesController.courses)


module.exports = router;

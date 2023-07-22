const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');
const middlewareController = require('../app/controllers/MildewareController');
const {static} = require("express");

router.get('/create',middlewareController.verifyToken,coursesController.create)
router.post('/store',middlewareController.verifyToken,coursesController.store)
router.get('/:slug',middlewareController.verifyToken, coursesController.show);
router.get('/',middlewareController.verifyToken,coursesController.courses)


module.exports = router;

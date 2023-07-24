const express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewController');
const middlewareController = require('../app/controllers/MildewareController');
const coursesController = require("../app/controllers/CoursesController");


router.get('/tech', middlewareController.verifyToken, newController.tech);
router.get('/job', middlewareController.verifyToken, newController.job);
router.get('/my_news',middlewareController.verifyToken,newController.show)
router.delete('/:id',middlewareController.verifyToken,newController.delete)
router.get('/:id/edit',middlewareController.verifyToken,newController.edit)
router.put('/:id',middlewareController.verifyToken,newController.save)
router.get('/', middlewareController.verifyToken);


module.exports = router;

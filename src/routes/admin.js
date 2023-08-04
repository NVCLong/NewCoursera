const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');

router.get('/courses', adminController.adminCourse);
router.get('/article', adminController.adminArticle);
router.get('/users', adminController.adminUser);
router.get('/jobs', adminController.adminJobs);
router.get('/', adminController.adminPage);

module.exports = router;

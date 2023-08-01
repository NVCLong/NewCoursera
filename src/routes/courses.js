const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');
const middlewareController = require('../app/controllers/MildewareController');
const { static } = require('express');

router.get(
  '/create',
  middlewareController.adminVerify,
  middlewareController.verifyToken,
  coursesController.create,
);
router.post(
  '/store',
  middlewareController.verifyToken,
  coursesController.store,
);
router.get('/:slug', middlewareController.verifyToken, coursesController.show);
router.get(
  '/:id/edit',
  middlewareController.verifyToken,
  coursesController.edit,
);
router.put('/:id', middlewareController.verifyToken, coursesController.update);
router.delete(
  '/:id',
  middlewareController.verifyToken,
  coursesController.delete,
);
router.get(
  '/stored/:id',
  middlewareController.verifyToken,
  coursesController.addToCart,
);
router.get(
  '/subcourse/form',
  middlewareController.adminVerify,
  middlewareController.verifyToken,
  coursesController.subcourseForm,
);
router.post(
  '/subcourse/store',
  middlewareController.verifyToken,
  coursesController.subStore,
);
router.get('/', middlewareController.verifyToken, coursesController.courses);

module.exports = router;

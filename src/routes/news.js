const express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewController');
const middlewareController = require('../app/controllers/MildewareController');

router.get('/tech', middlewareController.verifyToken, newController.tech);
router.get('/job', middlewareController.verifyToken, newController.job);
router.get(
  '/create',
  middlewareController.adminVerify,
  middlewareController.verifyToken,
  newController.create,
);
router.post('/store', middlewareController.verifyToken, newController.store);
router.get('/my_news', middlewareController.verifyToken, newController.show);
router.get(
  '/job/:slug',
  middlewareController.verifyToken,
  newController.details,
);
router.delete('/:id', middlewareController.verifyToken, newController.delete);
router.get('/:id/edit', middlewareController.verifyToken, newController.edit);
router.put('/:id', middlewareController.verifyToken, newController.save);
router.get(
  '/:id/editJobs',
  middlewareController.adminVerify,
  newController.jobEdit,
);
router.put(
  '/jobs/:id',
  middlewareController.verifyToken,
  newController.jobStore,
);
router.delete('/jobs/:id',middlewareController.verifyToken, middlewareController.adminVerify, newController.deleteJob)
router.get('/job/:slug/cv',middlewareController.verifyToken, newController.cvForm)
router.get('/', middlewareController.verifyToken);

module.exports = router;

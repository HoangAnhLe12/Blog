var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);

router.post('/store', courseController.store);

router.get('/:id/edit', courseController.edit);

router.post('/handle-form-action', courseController.handleFormActions);

router.delete('/:id', courseController.delete);

router.put('/:id', courseController.update);

router.patch('/:id/restore', courseController.restore);

router.delete('/:id/force', courseController.destroy);

router.get('/:slug', courseController.show);

module.exports = router;

const {
  singleTodoController,
} = require('../../../../../controllers/todoController.controller');

const router = require('express').Router();
router.get('/:id', singleTodoController);
module.exports = router;

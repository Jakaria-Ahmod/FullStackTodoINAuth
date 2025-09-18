const {
  updateTodoController,
} = require('../../../../../controllers/todoController.controller');

const router = require('express').Router();
router.put('/:id', updateTodoController);
module.exports = router;

const {
  createTodoContorller,
} = require('../../../../../controllers/todoController.controller');

const router = require('express').Router();
router.post('/', createTodoContorller);
module.exports = router;

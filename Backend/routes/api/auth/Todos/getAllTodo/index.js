const {
  getAllTodoContrller,
} = require('../../../../../controllers/todoController.controller');

const router = require('express').Router();
router.get('/', getAllTodoContrller);
module.exports = router;

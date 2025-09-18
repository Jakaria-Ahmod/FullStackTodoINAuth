const {
  deleteTodoController,
} = require('../../../../../controllers/todoController.controller');

const rotuer = require('express').Router();
rotuer.delete('/:id', deleteTodoController);
module.exports = rotuer;

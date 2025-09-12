const {
  resetPasswordController,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();

router.post('/:token', resetPasswordController);

module.exports = router;

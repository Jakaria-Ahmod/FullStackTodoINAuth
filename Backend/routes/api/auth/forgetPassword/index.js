const {
  forgetPasswordController,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();

router.post('/', forgetPasswordController);

module.exports = router;

const {
  verifyEmailController,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();

router.post('/:token', verifyEmailController);

module.exports = router;

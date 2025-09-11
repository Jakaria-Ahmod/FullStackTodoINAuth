const {
  registionController,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();

router.post('/', registionController);

module.exports = router;

const {
  refreshController,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();

router.post('/', refreshController);

module.exports = router;

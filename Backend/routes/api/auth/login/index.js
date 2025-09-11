const {
  loginControlller,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();
router.post('/', loginControlller);

module.exports = router;

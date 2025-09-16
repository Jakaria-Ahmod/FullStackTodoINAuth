const {
  allUserController,
} = require('../../../../controllers/registionController.controller');

const router = require('express').Router();
router.get('/', allUserController);
module.exports = router;

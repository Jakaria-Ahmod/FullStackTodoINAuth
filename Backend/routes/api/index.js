const router = require('express').Router();
const registion = require('./auth/registion');
const login = require('./auth/login');

router.use('/registion', registion);
router.use('/login', login);

module.exports = router;

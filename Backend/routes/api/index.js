const router = require('express').Router();
const registion = require('./auth/registion');
const login = require('./auth/login');
const verifyEmail = require('./auth/verifyEmail');
const refresh = require('./auth/refrash');

router.use('/registion', registion);
router.use('/login', login);
router.use('/verify', verifyEmail);
router.use('/refresh', refresh);

module.exports = router;

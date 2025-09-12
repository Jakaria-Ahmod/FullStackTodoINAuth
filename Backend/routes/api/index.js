const router = require('express').Router();
const registion = require('./auth/registion');
const login = require('./auth/login');
const verifyEmail = require('./auth/verifyEmail');
const refresh = require('./auth/refrash');
const resetPassword = require('./auth/resetPassword');
const forgetPassword = require('./auth/forgetPassword');

router.use('/registion', registion);
router.use('/login', login);
router.use('/verify', verifyEmail);
router.use('/refresh', refresh);
router.use('/reset-password', resetPassword);
router.use('/forget-password', forgetPassword);

module.exports = router;

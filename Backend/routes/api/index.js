const router = require('express').Router();
const registion = require('./auth/registion');
const login = require('./auth/login');
const verifyEmail = require('./auth/verifyEmail');
const refresh = require('./auth/refrash');
const resetPassword = require('./auth/resetPassword');
const forgetPassword = require('./auth/forgetPassword');
const allUser = require('./auth/allUser');
const createTodo = require('./auth/Todos/createTods');
const authMiddleware = require('../../jwt/AuthMeddaleWare');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.trim());
  },
});

const upload = multer({ storage: storage });

router.use('/registion', registion);
router.use('/login', login);
router.use('/verify', verifyEmail);
router.use('/refresh', refresh);
router.use('/reset-password', resetPassword);
router.use('/forget-password', forgetPassword);
router.use('/allUser', allUser);
router.use('/createTodo', authMiddleware, upload.single('file'), createTodo);

module.exports = router;

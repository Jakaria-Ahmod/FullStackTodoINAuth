const router = require('express').Router();
const registion = require('./auth/registion');
const login = require('./auth/login');
const verifyEmail = require('./auth/verifyEmail');
const refresh = require('./auth/refrash');
const resetPassword = require('./auth/resetPassword');
const forgetPassword = require('./auth/forgetPassword');
const allUser = require('./auth/allUser');
const createTodo = require('./auth/Todos/createTods');
const updateTodo = require('./auth/Todos/uapdateTodo');
const getAllTodo = require('./auth/Todos/getAllTodo');
const deletTodo = require('./auth/Todos/deleteTodo');
const sigleTodo = require('./auth/Todos/singleTodo');
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

/**
 * @swagger
 * /registion:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Jakaria
 *               email:
 *                 type: string
 *                 example: jakaria@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               dateOfBrith:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jakaria@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 */
router.use('/registion', registion);
router.use('/login', login);
router.use('/verify', verifyEmail);
router.use('/refresh', refresh);
router.use('/reset-password', resetPassword);
router.use('/forget-password', forgetPassword);
router.use('/allUser', allUser);
router.use('/createTodo', authMiddleware, upload.single('file'), createTodo);
router.use('/updateTodo', authMiddleware, upload.single('file'), updateTodo);
router.use('/getAllTodo', authMiddleware, getAllTodo);
router.use('/deletTodo', authMiddleware, deletTodo);
router.use('/singleTodo', authMiddleware, sigleTodo);

module.exports = router;

const rateLimit = require('express-rate-limit');
const { authenticate } = require('../middleware/authMiddleware');
const router = require('express').Router();

const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');
const logout = require('../controllers/auth/logout');
const me = require('../controllers/auth/me');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});

router.use(limiter);
router.use(authenticate);

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me', me);

module.exports = router;
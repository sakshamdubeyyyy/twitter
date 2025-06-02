const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const userValidationRules = require('../validators/userValidator');
const validate = require('../middlewares/validate');

router.post('/register', userValidationRules, validate, register);
router.post('/login', userValidationRules, validate, login);
router.post('/logout', logout);

module.exports = router;
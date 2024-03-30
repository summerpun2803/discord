const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');



router.post('/register', auth.controller.register)

router.post('/login', auth.controller.login)

module.exports = router; 
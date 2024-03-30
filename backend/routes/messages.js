const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect')
const test = require('../controllers/messages')

router.get('/test' ,protect , test.controller.test );

module.exports = router;
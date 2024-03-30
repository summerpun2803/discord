const express = require('express');
const protect = require('../middleware/protect');
const { invite, accept, reject } = require('../controllers/friendInvite');
const router = express.Router();

router.post('/invite' , protect , invite);
router.post('/accept' , protect , accept);
router.post('/reject' , protect , reject);


module.exports = router;
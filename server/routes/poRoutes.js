const express = require('express');
const { register } = require('../controllers/poController');
const router = express.Router();

router.post('/register', register);


module.exports = router;
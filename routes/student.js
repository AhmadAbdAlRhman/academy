const express = require('express');
const router = express.Router();
const Student = require('../controls/student/Auth');

router.post('/login',Student.login);

module.exports = router;
const express = require('express');
const router = express.Router();
const Admin_Student = require('../controls/admin/students');

router.post('/add_student',Admin_Student.add_student);

module.exports = router;
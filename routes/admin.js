const express = require('express');
const router = express.Router();
const Admin_Student = require('../controls/admin/students');
const Admin_Subject = require('../controls/admin/Subject');
//1) إضافة طالب جديد عالمعهد
router.post('/add_student',Admin_Student.add_student);
//2) إضافة فرع جديد 
router.post('/add_new_branch',Admin_Subject.add_branch);
module.exports = router;
const express = require('express');
const router = express.Router();
const upload_student = require('../middleware/uploads');
const Admin_Student = require('../controls/admin/students');
const Admin_Subject = require('../controls/admin/Subject');
const Admin_Auth = require('../controls/admin/Auth');
//1) إضافة طالب جديد عالمعهد
router.post('/add_student', upload_student.single('photo'), Admin_Student.add_student);
//2) إضافة فرع جديد
router.post('/add_new_class', Admin_Subject.add_class);
//3) إضافة مادة جديدة
router.post('/add_new_subject', Admin_Subject.add_subject);
//4) إضافة مدير جديد
router.post('/add_admin', Admin_Auth.add_admin);
//5) جلب الصفوف
router.get('/get_all_class', Admin_Subject.get_class);
module.exports = router;


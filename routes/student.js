const express = require('express');
const router = express.Router();
const Student = require('../controls/student/Auth');
const Student_intesive = require('../controls/student/intensive courses');
//1) تسجيل الدخول
router.post('/login',Student.login);
//2) جلب الدورات المكثفة الخاصة بالطالب
router.get('/mine_intensive', Student_intesive.get_student_intensives);
module.exports = router;
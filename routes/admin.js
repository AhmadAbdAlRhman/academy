const express = require('express');
const router = express.Router();
const {upload_student, upload_intensive} = require('../middleware/uploads');
const Admin_Student = require('../controls/admin/students');
const Admin_Subject = require('../controls/admin/Subject');
const Admin_Auth = require('../controls/admin/Auth');
const Admin_ads = require('../controls/admin/ads');
const Admin_intensive = require('../controls/admin/intensive courses');
//1) إضافة طالب جديد عالمعهد
router.post('/add_student', upload_student.single('photo'), Admin_Student.add_student);
//2) إضافة صف جديد
router.post('/add_new_class', Admin_Subject.add_class);
//3) إضافة مادة جديدة
router.post('/add_new_subject', Admin_Subject.add_subject);
//4) إضافة مدير جديد
router.post('/add_admin', Admin_Auth.add_admin);
//5) جلب الصفوف
router.get('/get_all_class', Admin_Subject.get_class);
//6) إضافة إعلان
router.get('/add_ads', Admin_ads.add_ads);
//7) جلب جميع الإعلانات
router.get('/all_ads', Admin_ads.get_all_ads);
//8) إضافة دورة مكثقة
router.post('/new_intensive', upload_intensive.single('photo'), Admin_intensive.add_intensive);
//9) تعديل بيانات الدورة المكثفة
router.put('/update_intensive', upload_intensive.single('photo'), Admin_intensive.update_intensive);
//10) حذف الدورة المكثفة
router.delete('/deleted_intensive',  Admin_intensive.delete_intensive);
//11) حذف جميع الدورات المكثفة
router.delete('/deleted_intensives', Admin_intensive.delete_all_intensive);
module.exports = router;
const express = require('express');
const router = express.Router();
const {upload_student, upload_intensive} = require('../middleware/uploads');
const Admin_Student = require('../controls/admin/students');
const Admin_Subject = require('../controls/admin/Subject');
const Admin_Auth = require('../controls/admin/Auth');
const Admin_ads = require('../controls/admin/ads');
const Admin_intensive = require('../controls/admin/intensive courses');
//1(  إضافة طالب جديد عالمعهد
router.post('/add_student', upload_student.single('photo'), Admin_Student.add_student);
//2(جلب جميع الطلاب مع المواد المسجلين فيها
router.get('/all_students', Admin_Student.get_students_with_filters);
//3( جلب طالب محدد
router.get('/one_student/:student_id', Admin_Student.get_student);
//4( إضافة صف جديد
router.post('/add_new_class', Admin_Subject.add_class);
//5( إضافة مادة جديدة
router.post('/add_new_subject', Admin_Subject.add_subject);
//6( جلب جميع المواد الخاصة ب صف معين
router.get('/subjects/:class_id',Admin_Subject.getSubjectsForClass);
//7( إضافة مدير جديد
router.post('/add_admin', Admin_Auth.add_admin);
//8( جلب الصفوف
router.get('/get_all_class', Admin_Subject.get_class);
//9(إضافة إعلان
router.get('/add_ads', Admin_ads.add_ads);
//10(جلب جميع الإعلانات
router.get('/all_ads', Admin_ads.get_all_ads);
//11( جلب إعلان واحد
router.get('/one_ads/:ads_id', Admin_ads.get_one_ads);
//12( إضافة دورة مكثقة
router.post('/new_intensive', upload_intensive.single('photo'), Admin_intensive.add_intensive);
//13( تعديل بيانات الدورة المكثفة
router.put('/update_intensive', upload_intensive.single('photo'), Admin_intensive.update_intensive);
//14( حذف الدورة المكثفة
router.delete('/deleted_intensive',  Admin_intensive.delete_intensive);
//15( حذف جميع الدورات المكثفة
router.delete('/deleted_intensives', Admin_intensive.delete_all_intensive); 
//16(جلب جميع الدورات المكثفة
router.get('/all_intensive', Admin_intensive.get_all_intensive);
//17(جلب دورة مكثفة واحدة
router.get('/one_intensive/:intensive_id', Admin_intensive.get_one_intensive);
//18( تسجيل بالدورات المكثفة
router.post('/enrollment_intensive', Admin_intensive.enrollment_intensive);
//19(  إلغاء تسجيل بالدورات المكثفة
router.post('/unenroll_intensive', Admin_intensive.unenroll_intensive);
//20( تغيير تقييم الطالب
router.put('/change_excellent', Admin_Student.put_student_excellent);
//21( جلب جميع الطلاب المتفوقين
router.get('/excellent_student', Admin_Student.get_excellent_student);
module.exports = router;
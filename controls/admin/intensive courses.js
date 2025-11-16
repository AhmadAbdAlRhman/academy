const Intensive_Courses = require('../../module/Intensive courses');
const Subject = require('../../module/subjects');
const Class = require('../../module/class');
const fs = require('fs');
const path = require('path');
module.exports.add_intensive = async (req, res) => {
    try {
        const {
            period,
            start_time,
            times,
            class_id,
            subject_id
        } = req.body;
        const photo = req.file ? req.file.filename : null;
        if (![period, start_time, times, class_id, subject_id].every(Boolean)) {
            return res.status(404).json({
                message: "يجب إدخال المعلومات الأساسية"
            });
        }
        const subject = await Subject.findByPk(subject_id);
        if (!subject) {
            return res.status(404).json({
                message: "لا توجد هذه المادة في قاعدة البيانات"
            });
        }
        const classy = await Class.findByPk(class_id);
        if (!classy) {
            return res.status(404).json({
                message: "لا توجد هذه الصف في قاعدة البيانات"
            });
        }
        const intensive_courses = await Intensive_Courses.create({
            period,
            start_time,
            times,
            photo,
            class_id,
            subject_id
        });
        return res.status(200).json({
            message: "تمت إضافة الدورة المكثفة ب نجاح",
            intensive_courses
        });
    } catch (err) {
        return res.status(500).json({
            message: "حدث خطأ أثناء إضافة الدورة المكثفة",
            Error: err.message
        });
    }
}

module.exports.update_intensive = async (req, res) => {
    try {
        const intensive_id = req.body.intensive_id;
        const {
            period,
            start_time,
            times,
            class_id,
            subject_id
        } = req.body;
        const photo = req.file ? req.file.filename : null;
        if (![period, start_time, times, class_id, subject_id].every(Boolean)) {
            return res.status(404).json({
                message: "يجب إدخال المعلومات الأساسية"
            });
        }
        const subject = await Subject.findByPk(subject_id);
        if (!subject) {
            return res.status(404).json({
                message: "لا توجد هذه المادة في قاعدة البيانات"
            });
        }
        const classy = await Class.findByPk(class_id);
        if (!classy) {
            return res.status(404).json({
                message: "لا توجد هذه الصف في قاعدة البيانات"
            });
        }
        const intensive = await Intensive_Courses.findByPk(intensive_id);
        if (!intensive) {
            return res.status(404).json({
                message: "الدورة المكثفة المطلوبة غير موجودة"
            });
        }
        if (photo && intensive.photo) {
            const oldPhotoPath = path.join(__dirname, '../../uploads/intensive', intensive.photo);
            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath);
            }
        }
        intensive.period = period;
        intensive.start_time = start_time;
        intensive.times = times;
        intensive.class_id = class_id;
        intensive.subject_id = subject_id;
        if (photo) intensive.photo = photo;
        await intensive.save();
        return res.status(200).json({
            message: "تم تعديل الدورة المكثفة بنجاح",
            intensive
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "حدث خطأ أثناء تعديل الدورة المكثفة",
            error: err.message
        });
    }
};

module.exports.delete_intensive = async (req, res) => {
    try {
        const intensive_id = req.body.intensive_id;
        const intensive = await Intensive_Courses.findByPk(intensive_id);
        if (!intensive) {
            return res.status(404).json({
                message: "الدورة المكثفة المطلوبة غير موجودة"
            });
        }
        if (intensive.photo) {
            const photoPath = path.join(__dirname, '../../uploads/intensive', intensive.photo);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }
        await intensive.destroy();
        return res.status(200).json({
            message: "تم حذف الدورة المكثفة بنجاح"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "حدث خطأ أثناء حذف الدورة المكثفة",
            error: err.message
        });
    }
};

module.exports.delete_all_intensive = async (req, res) => {
    try {
        const allCourses = await Intensive_Courses.findAll();
        if (allCourses.length === 0) {
            return res.status(404).json({
                message: "لا توجد دورات مكثفة للحذف"
            });
        }
        allCourses.forEach(course => {
            if (course.photo) {
                const photoPath = path.join(__dirname, '../../uploads/intensive', course.photo);
                if (fs.existsSync(photoPath)) {
                    fs.unlinkSync(photoPath);
                }
            }
        });
        await Intensive_Courses.destroy({ where: {} });
        return res.status(200).json({
            message: "تم حذف جميع الدورات المكثفة بنجاح"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "حدث خطأ أثناء حذف جميع الدورات المكثفة",
            error: err.message
        });
    }
};
const Student = require('../../module/student');
const Subject = require('../../module/subjects');
const Enrollement = require('../../module/enrollment');
const subject_class = require('../../module/class_subject');
const {
    getFifthOfNextMonth
} = require('../../functions/getFifthOfNextMonth');
const {
    generateCode
} = require('../../functions/generateCode');
const {
    hash
} = require('../../utils/hash');

module.exports.add_student = async (req, res) => {
    const transaction = await Student.sequelize.transaction();
    try {
        const {
            name,
            phone,
            registration_system,
            class_id
        } = req.body;
        const subjectIds = req.body.subjectIds ? JSON.parse(req.bosdy.subjectIds) : [];
        const photo = req.file ? req.file.filename : null;
        const cleanPhone = phone.replace(/\s/g, '');
        if (!/^(09[3-9]\d{7}|9639\d{8}|\+9639\d{8})$/.test(cleanPhone)) {
            return res.status(400).json({
                error: "رقم الجوال غير صحيح\nمثال: 0933123456 أو 963933123456"
            });
        }
        const existing = await Student.findOne({
            where: {
                name
            }
        });
        if (existing) {
            return res.status(400).json({
                error: "الاسم موجود مسبقًا"
            });
        }
        const code = generateCode();
        const hashedCode = await hash(code); // أضف await هنا
        const codeExpiresAt = getFifthOfNextMonth();
        const student = await Student.create({
            name,
            phone: cleanPhone,
            code: hashedCode,
            registration_system: registration_system,
            photo: photo,
            hasPaid: true,
            codeExpiresAt,
            class_id
        }, {
            transaction
        });
        let enrollmentSubject = [];
        if (registration_system === 'نظام صفي') {
            const classSubject = await subject_class.findAll({
                where: {
                    ClassId: class_id
                }
            });
            enrollmentSubject = classSubject.map((s) => s.id);
        } else if (registration_system === 'نظام مواد') {
            if (!subjectIds || subjectIds.length === 0)
                throw new Error('يجب تحديد المواد في نظام المواد');
            const validSubjects = await subject_class.findAll({
                where: {
                    SubjectId: subjectIds,
                    ClassId: class_id
                }
            });
            if (validSubjects.length !== subjectIds.length)
                throw new Error('بعض المواد لا تتبع الصف المحدد');
            enrollmentSubject = subjectIds;
        }
        const enrollments = enrollmentSubject.map((subjectId) => ({
            UserId: student.id,
            SubjectId: subjectId
        }));
        await Enrollement.bulkCreate(enrollments, {
            transaction
        });
        await transaction.commit();
        res.status(201).json({
            success: true,
            message: "تم إضافة الطالب بنجاح!",
            طالب: student,
            code: code, // احذفه لاحقًا
            ينتهي_في: `٥ ${codeExpiresAt.toLocaleDateString('ar-SY', { month: 'long', year: 'numeric' })}`,
            enrollmentSubjects: enrollmentSubject.length
        });
    } catch (err) {
        console.error("خطأ في add_student:", err);
        await transaction.rollback();
        res.status(500).json({
            error: "فشل في إضافة الطالب",
            تفاصيل: err.message
        });
    }
};
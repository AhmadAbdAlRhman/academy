const Student = require('../../module/student');
const Subject = require('../../module/subjects');
// const Enrollement = require('../../module/enrollment');
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
const Class = require('../../module/class');

module.exports.add_student = async (req, res) => {
    const transaction = await Student.sequelize.transaction();
    try {
        const {
            name,
            phone,
            registration_system,
            class_id,
            subjectIds
        } = req.body;
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
            const classSubject = await Class.findByPk(class_id, {
                include: [{
                    model: Subject,
                    as: "subjects"
                }]
            });
            if (!classInstance)
                throw new Error("الصف غير موجود");
            if (!classInstance.subjects || classInstance.subjects.length === 0)
                throw new Error("لا توجد مواد لهذا الصف");
            enrollmentSubject = classSubject.subjects.map(sub => sub.id);
        } else if (registration_system === 'نظام مواد') {
            if (!subjectIds || subjectIds.length === 0)
                throw new Error('يجب تحديد المواد في نظام المواد');
            const validSubjects = await Class.findByPk(class_id, {
                include: [{
                    model: Subject,
                    as: "subjects",
                    where: {
                        id: subjectIds
                    }
                }]
            });
            if (validSubjects.length !== subjectIds.length)
                throw new Error('بعض المواد لا تتبع الصف المحدد');
            enrollmentSubject = subjectIds;
        }
        if (enrollmentSubject.length > 0) {
            await student.addSubjects(enrollmentSubject, {
                transaction
            });
        }
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

module.exports.get_students_with_filters = async (req, res) => {
    try {
        let {
            page = 1, limit = 10, classId, year
        } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        let filters = {};
        if (classId) {
            filters.ClassId = classId;
        }
        if (year) {
            filters.year = year;
        }
        const {
            count,
            rows: students
        } = await Student.findAndCountAll({
            where: filters,
            limit: limit,
            offset: offset,
            include: [{
                    model: Subjects,
                    as: "subjects",
                    through: {
                        attributes: []
                    },
                    attributes: ["id", "name", "teacher_name"]
                },
                {
                    model: Class,
                    as: "class_info",
                    attributes: ["id", "name"]
                }
            ],
            attributes: ["id", "name", "phone", "photo", "year", "ClassId"]
        });
        return res.status(200).json({
            message: "تم جلب الطلاب بنجاح",
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
            students
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "خطأ في السيرفر",
            Error: err.message
        });
    }
};

module.exports.get_student = async (req, res) => {
    try {
        const student_id = req.params.student_id;
        if (!student_id || isNaN(student_id)) {
            return res.status(400).json({
                message: "معرف الطالب غير صالح",
                subjects: []
            });
        }
        const student = await Student.findByPk(student_id, {
            include: [{
                model: Subject,
                as: "subjects",
                through: {
                    attributes: []
                },
                attributes: [
                    "id",
                    "name",
                    "teacher_name",
                    "teacher_phone",
                    "teacher_photo",
                    "createdAt",
                    "updatedAt"
                ]
            }],
            attributes: ["id", "name", "phone", "photo", "registration_system", "year"]
        });
        if (!student) {
            return res.status(404).json({
                message: "الطالب غير موجود",
                subjects: []
            });
        }
        return res.status(200).json({
            message: "تم جلب بيانات الطالب ومواده بنجاح",
            student_id: student.id,
            student_name: student.name,
            subjects_count: student.subjects.length,
            subjects: student.subjects
        });
    } catch (err) {
        console.error("خطأ في get_student_subjects:", err);
        return res.status(500).json({
            message: "حدث خطأ في الخادم",
            error: err.message
        });
    }
}

module.exports.put_student_excellent = async (req, res) => {
    try{
        const student_id = req.body;
        const student = await Student.findByPk(student_id);
        if(!student){
            return res.status(404).json({
                message:"لا يوجد هذا الطالب في قاعدة البيانات"
            });
        }
        if (student.excellent){
            student.excellent = false;
        }else{
            student.excellent = true;
        }
        return res.statud(200).json({
            message:''
        })
        await student.save();

    }catch(err){

    }
}
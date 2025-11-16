const Class = require('../../module/class');
const Subject = require('../../module/subjects');
const Subject_Class = require('../../module/class_subject');
const sequelize = require('../../config/db');

module.exports.add_class = async (req, res) => {
    try {
        const name = req.body.name;
        const new_class = await Class.create({
            name
        });
        res.status(200).json({
            message: `تمت إضافة ${new_class.name}`
        });
    } catch (err) {
        res.status(500).json({
            message: "",
            Error: err.message
        })
    }
}

module.exports.add_subject = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            name,
            teacher_name,
            teacher_phone,
            class_id
        } = req.body;
        if (!name || !class_id) {
            return res.status(400).json({
                message: "الرجاء إدخال اسم المادة والصف"
            });
        }
        const ClassRow = await Class.findByPk(class_id);
        if (!ClassRow) {
            return res.status(404).json({
                message: "الصف المطلوب غير موجود"
            });
        }
        const subject = await Subject.create({
            name,
            teacher_name,
            teacher_phone
        }, {
            transaction
        });
        await Subject_Class.create({
            ClassId: class_id,
            SubjectId: subject.id
        }, {
            transaction
        });
        await transaction.commit();
        res.status(201).json({
            message: `تمت إضافة المادة "${subject.name}" بنجاح إلى صف "${ClassRow.name}"`,
            Subject: subject
        })

    } catch (err) {
        await transaction.rollback();
        res.status().json({
            message: "حدث خطأ أثناء إضافة المادة",
            Error: err.message
        })
    }
}

module.exports.get_class = async (_req, res) => {
    try {
        const classes = await Class.findAll();
        res.status(200).json({
            message: "تم جلب الصفوف بنجاح",
            classes
        })
    } catch (err) {
        res.status(500).json({
            message: "حدثت مشكلة أثناء جلب الصفوف",
            Error: err.message
        })
    }
}

exports.getSubjectsForClass = async (req, res) => {
    try {
        const classId = parseInt(req.params.class_id);
        if (isNaN(classId)) {
            return res.status(400).json({
                message: "معرف الصف غير صالح",
                class_id: null,
                class_name: null,
                subjects_count: 0,
                subjects: []
            });
        }
        const classInstance = await Class.findByPk(classId, {
            include: [{
                model: Subject,
                as: 'subjects',
                through: {
                    attributes: []
                },
                attributes: [
                    'id',
                    'name',
                    'teacher_name',
                    'teacher_phone',
                    'teacher_photo',
                ]
            }],
            attributes: ['id', 'name']
        });
        if (!classInstance) {
            return res.status(404).json({
                message: "الصف غير موجود",
                class_id: classId,
                class_name: null,
                subjects_count: 0,
                subjects: []
            });
        }
        const subjects = classInstance.subjects || [];
        const subjectsCount = subjects.length;
        return res.status(200).json({
            message: subjectsCount > 0 ? "تم جلب المواد بنجاح" : "لا توجد مواد لهذا الصف",
            class_id: classId,
            class_name: classInstance.name,
            subjects_count: subjectsCount,
            subjects
        });
    } catch (err) {
        return res.status(500).json({
            message: "حدث خطأ في الخادم",
            Error: err.message
        });
    }
};
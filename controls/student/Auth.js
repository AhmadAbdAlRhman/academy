const { generateToken_student } = require('../../functions/jwt');
const Student = require('../../module/student');
const {
    compare
} = require('../../utils/hash');
module.exports.login = async (req, res) => {
    const {
        name,
        code
    } = req.body;

    if (!name || !code) {
        return res.status(400).json({
            error: 'اسم وكود مطلوبان'
        });
    }
    try {
        const student = await Student.findOne({
            where: {
                name
            }
        });
        if (!student) return res.status(404).json({
            error: 'الطالب غير موجود'
        });
        if (!student.code) {
            return res.status(403).json({
                error: "الكود محذوف! ادفع عشان ترجع"
            });
        }
        const isCodeValid = await compare(code, student.code);
        if (!isCodeValid) {
            return res.status(401).json({
                error: "الكود خاطئ"
            });
        }
        if (student.codeExpiresAt && new Date() > student.codeExpiresAt && !student.hasPaid) {
            return res.status(403).json({
                error: 'الكود منتهي الصلاحية! ادفع عشان ترجع تدخل'
            });
        }
        const token = ge
        res.json({
            message: 'تسجيل دخول ناجح!',
            student: {
                name: student.name,
                hasPaid: student.hasPaid,
                photo: student.photo
            },
            token: generateToken_student(student)
        });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ أثناء تسجيل الدخول",
            error: err.message
        });
    }
};
const Student = require('../../module/student');
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
    const {
        name,
        phone,
        registration_system,
        photo
    } = req.body;

    try {
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
            code: hashedCode, // الآن هو string مشفر
            registration_system: registration_system || "غير محدد",
            photo: photo || "https://i.imgur.com/7p1Xj1f.png",
            hasPaid: true,
            codeExpiresAt
        });
        res.status(201).json({
            success: true,
            message: "تم إضافة الطالب بنجاح!",
            طالب: student.name,
            code: code, // احذفه لاحقًا
            ينتهي_في: `٥ ${codeExpiresAt.toLocaleDateString('ar-SY', { month: 'long', year: 'numeric' })}`
        });
    } catch (err) {
        console.error("خطأ في add_student:", err);
        res.status(500).json({
            error: "فشل في إضافة الطالب",
            تفاصيل: err.message
        });
    }
};
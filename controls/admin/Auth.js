const {
    hash
} = require('../../utils/hash');
const Managment = require("../../module/managment");

module.exports.add_admin = async (req, res) => {
    try {
        const {
            user_name,
            password,
            Role
        } = req.body;
        if (!user_name || !password || !Role) {
            return res.status(404).json({
                message: "جميع الحقول مطلوبة"
            });
        }
        const existing = await Managment.findOne({
            where: {
                user_name
            }
        });
        if (existing) {
            return res.status(400).json({
                message: "اسم المستخدم موجود مسبقًا"
            });
        }
        const hashedPassword = hash(password);
        const new_manag = await Managment.create({
            user_name,
            password: hashedPassword,
            Role
        });
        return res.status(200).json({
            message: "تم إنشاء الحساب بنجاح",
            new_manag
        })
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ أثناء إضافة المدير",
            Error: err.message
        })
    }
}
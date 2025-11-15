const {
    hash,
    compare
} = require('../../utils/hash');
const Managment = require("../../module/managment");
const { generateToken_managment } = require('../../functions/jwt');

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

module.exports.login_managment = async (req, res) => {
    try{
        const {user_name, password} = req.body;
        if (!user_name || !password) {
            return res.status(400).json({
                message: "اسم المستخدم وكلمة المرور مطلوبان"
            });
        }
        const managment  = await Managment.findOne({where: {user_name}});
        if(!managment){
            return res.status(404).json({
                message:"المستخدم ليس موجود ضمن قاعدة البيانات"
            });
        }
        const isvalid = await compare(password, managment.password);
        if (!isvalid) {
            return res.status(400).json({
                message:"كلمة المرور غير صحيحة"
            });
        }
        return res.status(200).json({
            message:"تم تسجيل الدخول بنجاح",
            admin: {
                id: managment.id,
                user_name: managment.user_name,
                Role: managment.Role,
            },
            token: generateToken_managment(managment)
        });
    }catch(err){
        res.status(500).json({
            message:"حدث خطأ أثناء تسجيل الدخول",
            Error: err.message
        })
    }
}
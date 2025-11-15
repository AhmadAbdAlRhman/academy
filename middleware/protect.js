const jwt = require('jsonwebtoken');
const Student = require("../module/student");
require('dotenv').config();
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(404).json({
            message: "انتهت الجلسة. الرجاء تسجيل الدخول مجدداً"
        });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decoded.id);
        if (!student) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }
        req.student = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            meesage: `${err.message}`
        })
    }
}
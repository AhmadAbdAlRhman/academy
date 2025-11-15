
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5, 
    message: {
        message: "عدد محاولات تسجيل الدخول كبير جدًا، حاول بعد دقيقة."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;

// jobs/cleanup.js
const cron = require('node-cron');
const {
    Op
} = require('sequelize');
const Student = require('../module/student');
// const {
//     sendWhatsApp
// } = require('../utils/whatsapp');
async function cleanupExpiredCodes() {
    try {
        const now = new Date();
        console.log(`بدء التنظيف اليومي: ${now.toLocaleString('ar-SY')}`);
        const expired = await Student.findAll({
            where: {
                hasPaid: false,
                codeExpiresAt: {
                    [Op.lt]: now
                },
                code: {
                    [Op.ne]: null
                }
            }
        });
        if (expired.length === 0) {
            console.log("لا يوجد أكواد منتهية اليوم");
            return;
        }
        for (let student of expired) {
            student.code = null;
            student.codeExpiresAt = null;
            await student.save();
            // إرسال تنبيه واتساب
            //const msg = `
            // كودك انحذف يا ${student.name}!

            // السبب: ما دفعت قبل يوم 5

            // ادفع الآن عشان ترجع تدخل
            // رقم الدفع: 0933 123 456
            // `.trim();

            //             await sendWhatsApp(student.phone, msg);
            console.log(`تم حذف كود: ${student.name} → ${student.phone}`);
        }

        console.log(`تم تنظيف ${expired.length} طالب منتهي`);
    } catch (err) {
        console.error('خطأ في التنظيف:', err);
    }
}
cron.schedule('0 0 * * *', () => {
    console.log('بدء التنظيف اليومي الساعة 00:00');
    cleanupExpiredCodes();
});
console.log('نظام التنظيف جاهز - يشتغل كل يوم 00:00');
cleanupExpiredCodes();
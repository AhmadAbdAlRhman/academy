const {
    Sequelize
} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DataBase, process.env.DataUser, process.env.DataPass, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
    } catch (error) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error);
    }
})();
module.exports = sequelize;
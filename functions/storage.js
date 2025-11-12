const multer = require ('multer');
const path  = require('path');

const storage_student = multer.diskStorage({
    destination:  (_req, _res, cb) => {
        cb(null, 'uploads/students');
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
        cb(null, fileName);
    }
});

module.exports = {storage_student};
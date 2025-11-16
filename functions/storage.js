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
const storage_intensive = multer.diskStorage({
    destination:  (_req, _res, cb) => {
        cb(null, 'uploads/intensive');
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
        cb(null, fileName);
    }
});

module.exports = {storage_student, storage_intensive};
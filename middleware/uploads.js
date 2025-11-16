const multer = require('multer');
const {
    storage_intensive,
    storage_student
} = require('../functions/storage');
const {
    filefilter
} = require('../validations/filefilter');

const upload_student = multer({
    storage: storage_student,
    fileFilter: filefilter
});

const upload_intensive = multer({
    storage: storage_intensive,
    fileFilter: filefilter
});

module.exports = {upload_student, upload_intensive};
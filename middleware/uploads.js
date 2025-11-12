const multer = require('multer');
const {
    storage
} = require('../functions/storage');
const {
    filefilter
} = require('../validations/filefilter');

const upload_student = multer({
    storage: storage,
    fileFilter: filefilter
});

module.exports = upload_student
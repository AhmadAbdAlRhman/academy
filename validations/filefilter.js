const fileFilter = (_req, file, cb) => {
    const allowedImagesTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml', 'image/webp', 'image/heif', 'image/avif', 'image/jpg'];
    if (allowedImagesTypes.includes(file.mimetype))
        cb(null, true);
    else
        cb(new Error('❌الملف المرفوع ليس صورة أو فيديو مدعوم'), false);
}

module.exports = {
    fileFilter
};
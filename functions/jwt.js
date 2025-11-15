const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken_student = (student) => {
    return jwt.sign({
        id: student.id,
        Role: student.class_id,
        tokenVersion: student.code
    }, process.env.JWT_SECRET, {
        expiresIn: "180d"
    });
};
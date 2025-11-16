const Student = require("../../module/student");

module.exports.get_student_intensives = async (req, res) => {
    try {
        const {
            UserId
        } = req.student;
        const student = await Student.findByPk(UserId);
        if (!student) {
            return res.status(404).json({
                message: "الطالب غير موجود"
            });
        }
        const intensiveCourses = await student.getIntensive_courses();
        return res.status(200).json({
            message: "تم استرجاع الدورات بنجاح",
            courses: intensiveCourses
        });
    } catch (err) {
        return res.status(500).json({
            message: "حدث خطأ أثناء استرجاع الدورات",
            Error: err.message
        });
    }
};
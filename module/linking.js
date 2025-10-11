const sequelize = require('../config/db');

const Branch = require('./branch');
const Student = require('./student');
const BranchCourses = require('./branch_course');
const Course = require('./course');
const Teacher = require('./teacher');
const Lecture = require('./lecture');
const Intensive_courses = require('./Intensive courses');
require('./ads');

// 111111111111111111111111111111111111111111111111111111111111111111111111111111111
Branch.belongsToMany(Course, {
    through: BranchCourses
});
Course.belongsToMany(Branch, {
    through: BranchCourses
});
// 222222222222222222222222222222222222222222222222222222222222222222222222222222222
Teacher.hasMany(BranchCourses, {
    foreignKey: 'teacherId'
});
BranchCourses.belongsTo(Teacher, {
    foreignKey: 'teacherId'
});
// 333333333333333333333333333333333333333333333333333333333333333333333333333333333
Student.hasMany(BranchCourses, {
    foreignKey: 'studentId'
});
BranchCourses.belongsTo(Student, {
    foreignKey: 'studentId'
});
// 444444444444444444444444444444444444444444444444444444444444444444444444444444444
BranchCourses.hasMany(Lecture, {
    foreignKey: 'subject_id'
});
Lecture.belongsTo(BranchCourses, {
    foreignKey: 'subject_id'
})
// 555555555555555555555555555555555555555555555555555555555555555555555555555555555
BranchCourses.hasMany(Intensive_courses, {
    foreignKey: 'subject_id'
});
Intensive_courses.belongsTo(BranchCourses, {
    foreignKey: 'subject_id'
})
// #################################################################################
sequelize.sync({
    alter: true
})
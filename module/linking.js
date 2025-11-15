const sequelize = require('../config/db');

const Class = require('./class');
const Student = require('./student');
const class_subject = require('./class_subject');
const Subjects = require('./subjects');
const Lecture = require('./lecture');
const Intensive_courses = require('./Intensive courses');
const Enrollment = require('./enrollment');
const Managment = require('./managment');
const Ads = require('./ads');
require('./ads');

// 111111111111111111111111111111111111111111111111111111111111111111111111111111111
Class.belongsToMany(Subjects, {
    through: class_subject
});
Subjects.belongsToMany(Class, {
    through: class_subject
});
// 222222222222222222222222222222222222222222222222222222222222222222222222222222222
Class.hasMany(Student, {
    foreignKey: 'class_id'
});
Student.belongsTo(Class, {
    foreignKey: 'class_id'
});
// 333333333333333333333333333333333333333333333333333333333333333333333333333333333
class_subject.hasMany(Lecture, {
    foreignKey: 'subject_id'
});
Lecture.belongsTo(class_subject, {
    foreignKey: 'subject_id'
});
// 444444444444444444444444444444444444444444444444444444444444444444444444444444444
class_subject.hasMany(Intensive_courses, {
    foreignKey: 'subject_id'
});
Intensive_courses.belongsTo(class_subject, {
    foreignKey: 'subject_id'
});
// 555555555555555555555555555555555555555555555555555555555555555555555555555555555
Student.belongsToMany(Subjects,{
    through: Enrollment
});
Subjects.belongsToMany(Student,{
    through: Enrollment
});
// 666666666666666666666666666666666666666666666666666666666666666666666666666666666
Managment.hasMany(Ads,{
    foreignKey: 'managment_id'
});
Ads.belongsTo(Managment,{
    foreignKey: 'managment_id'
});
// #################################################################################
sequelize.sync({
    alter: true
})
const sequelize = require('../config/db');
const Class = require('./class');
const Student = require('./student');
const class_subject = require('./class_subject');
const Subjects = require('./subjects');
const Lecture = require('./lecture');
const Intensive_courses = require('./Intensive courses');
const Managment = require('./managment');
const Ads = require('./ads');
// 1. Class ↔ Subjects (many-to-many)
Class.belongsToMany(Subjects, {
    through: class_subject,
    as: 'subjects'
});
Subjects.belongsToMany(Class, {
    through: class_subject,
    as: 'classes'
});

// 2. Class ↔ Students (one-to-many)
Class.hasMany(Student, {
    foreignKey: "class_id"
});
Student.belongsTo(Class, {
    foreignKey: "class_id"
});

// 3. Class_Subject ↔ Lecture (one-to-many)
class_subject.hasMany(Lecture, {
    foreignKey: "class_subject_id"
});
Lecture.belongsTo(class_subject, {
    foreignKey: "class_subject_id"
});

// 4. Intensive Course ↔ Class / Subject
Intensive_courses.belongsTo(Class, {
    foreignKey: "class_id"
});
Intensive_courses.belongsTo(Subjects, {
    foreignKey: "subject_id"
});

// 5. Student ↔ Subjects (many-to-many)
Student.belongsToMany(Subjects, {
    through: "Subject_Enrollment",
    as: "subjects",
});

Subjects.belongsToMany(Student, {
    through: "Subject_Enrollment",
    as: "students",
});

// 6. Student ↔ Intensive Courses (many-to-many)
Student.belongsToMany(Intensive_courses, {
    through: "Intensive_Enrollment"
});
Intensive_courses.belongsToMany(Student, {
    through: "Intensive_Enrollment"
});

// 7. Managment ↔ Ads
Managment.hasMany(Ads, {
    foreignKey: "managment_id"
});
Ads.belongsTo(Managment, {
    foreignKey: "managment_id"
});

// #################################################################################
sequelize.sync({
    alter: true
})
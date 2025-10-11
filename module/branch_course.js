const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');

const BranchCourse = sequelize.define('BranchCourse', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'branch_courses',
    timestamps: true,
});

module.exports = BranchCourse;
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
}, {
    tableName: 'class_subject',
    timestamps: true,
});

module.exports = BranchCourse;
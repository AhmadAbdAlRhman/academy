const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'courses',
    timestamps: true,
});

module.exports = Course;
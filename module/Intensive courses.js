const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const IntensiveCourses = sequelize.define('IntensiveCourses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    period: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    times: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    photo:{
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'intensive_courses',
    timestamps: true,
});

module.exports = IntensiveCourses;
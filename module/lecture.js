const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Lecture = sequelize.define('Lecture', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pdf: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    vedio: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    exam: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'lecture',
    timestamps: true,
});

module.exports = Lecture;
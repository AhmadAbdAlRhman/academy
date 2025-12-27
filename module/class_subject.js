const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const ClassSubject = sequelize.define('ClassSubject', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'class_subject',
    timestamps: true,
});

module.exports = ClassSubject;


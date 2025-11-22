const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Student = sequelize.define('studenty', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    registration_system: {
        type: DataTypes.ENUM('نظام صفي', 'نظام مواد'),
        allowNull: false,
        defaultValue: 'نظام صفي'
    },
    hasPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    codeExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    excellent: {
        type: DataTypes.BOOLEAN,
        required: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: () => {
            return new Date().getFullYear();
        }
    }
}, {
    tableName: 'students',
    timestamps: true,
});

module.exports = Student;
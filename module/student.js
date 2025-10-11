const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Student = sequelize.define('User', {
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
        type: DataTypes.STRING(100),
        allowNull: false
    },
    hasPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    codeExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    photo:{
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'students',
    timestamps: true,
});

module.exports = Student;
const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    photo:{
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'teachers',
    timestamps: true,
});

module.exports = Teacher;
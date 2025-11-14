const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Class = sequelize.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    tableName: 'class',
    timestamps: true,
});

module.exports = Class;
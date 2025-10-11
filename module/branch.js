const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Branch = sequelize.define('Branch', {
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
    tableName: 'branchs',
    timestamps: true,
});

module.exports = Branch;
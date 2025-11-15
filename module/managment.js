const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Managment = sequelize.define('Managment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Role:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'managment',
    timestamps: true,
});

module.exports = Managment;
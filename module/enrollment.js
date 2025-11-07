const {
    DataTypes
} = require("sequelize");

const sequelize = require('../config/db');

const Enrollment  = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    tableName: 'enrollment',
    timestamps: true,
});

module.exports = Enrollment;
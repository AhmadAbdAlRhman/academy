const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');

const class_subject = sequelize.define('class_subject', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    tableName: 'class_subject',
    timestamps: true,
});

module.exports = class_subject;
const sequelize = require('../config/db');

sequelize.sync({
        alter: true
    })
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./userModel');

// Defining Storage
const Storage = sequelize.define('Storage', {
    idstorage: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_iduser: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'iduser'
        },
        allowNull: false
    }
}, {
    tableName: 'storage',
    timestamps: false
});

module.exports = Storage;
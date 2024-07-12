const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./userModel');
const Storage = require('./storageModel');
const Book = require('./bookModel');

//Definiendo Library
const Library = sequelize.define('Library', {
    idlibrary: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idstorage: {//Clave foránea
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Storage,
            key: 'idstorage'
        }
    },
    iduser: {//Clave foránea
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'iduser'
        }
    },
    idbook: {//Clave foránea
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'idbook'
        }
    },
    state: {//Estado de libro, leído o no
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'library',
    timestamps: false
});

module.exports = Library;
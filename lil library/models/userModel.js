const { Sequelize, DataTypes } = require('sequelize');
//Decidí utilizar Sequelize porque me resultó más sencillo para hacer la conexión con la db y poder manejarla
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

//Definiendo User
const User = sequelize.define('User', {
    iduser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;
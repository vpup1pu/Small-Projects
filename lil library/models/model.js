const { Sequelize } = require('sequelize');
//Decidí utilizar Sequelize porque me resultó más sencillo para hacer la conexión con la db y poder manejarla
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./userModel');
const Library = require('./libraryModel');
const Book = require('./bookModel');
const Storage = require('./storageModel');

//Relaciones
User.hasOne(Storage, { foreignKey: 'user_iduser' });
Storage.belongsTo(User, { foreignKey: 'user_iduser' });

Library.belongsTo(Storage, { foreignKey: 'idstorage' });
Library.belongsTo(Book, { foreignKey: 'idbook' }); 

Storage.hasMany(Library, { foreignKey: 'idstorage' });
Book.hasMany(Library, { foreignKey: 'idbook' }); 

//Probando la conexión
sequelize.authenticate()
.then(()=>{
    console.log('Conexión exitosa');
    return sequelize.sync();
})
.then(()=>{
    console.log('Sincronización de Model exitosa');
})
.catch(err =>{
    console.error('Error al conectar a la db: ', err);
});

module.exports = { sequelize, User, Library, Book, Storage };
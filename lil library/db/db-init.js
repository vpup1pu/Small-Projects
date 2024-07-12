/*Cree este archivo para configurar la creación de la base de datos, de no llegar a existir*/
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión con el servidor: ' + err);
        return;
    }
    console.log('Estado de conexión: CONECTADA');

    const sqlCreateDb = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``;
    connection.query(sqlCreateDb, (err, results) => {
        if (err) {
            console.error('Error al crear la base de datos: ' + err);
            return;
        }
        console.log('Base de datos: CREADA/EXISTENTE/GARANTIZADA');

        connection.changeUser({ database: process.env.DB_NAME }, (err) => {
            if (err) {
                console.error(`Error al cambiar a la base de datos ${process.env.DB_NAME}: ${err}`);
                return;
            }

            // Definiciones de las tablas
            const createBookTableQuery = `
                CREATE TABLE IF NOT EXISTS book (
                    idbook INT PRIMARY KEY AUTO_INCREMENT,
                    title VARCHAR(100) NOT NULL,
                    author VARCHAR(100) NOT NULL,
                    pages INT NOT NULL
                )`;

            const createLibraryTableQuery = `
                CREATE TABLE IF NOT EXISTS library (
                    idlibrary INT PRIMARY KEY AUTO_INCREMENT,
                    idstorage INT,
                    iduser INT,
                    idbook INT,
                    state VARCHAR(45),
                    FOREIGN KEY (idstorage) REFERENCES storage(idstorage),
                    FOREIGN KEY (iduser) REFERENCES user(iduser),
                    FOREIGN KEY (idbook) REFERENCES book(idbook)
                )`;

            const createStorageTableQuery = `
                CREATE TABLE IF NOT EXISTS storage (
                    idstorage INT PRIMARY KEY AUTO_INCREMENT,
                    user_iduser INT,
                    FOREIGN KEY (user_iduser) REFERENCES user(iduser)
                )`;

            const createUserTableQuery = `
                CREATE TABLE IF NOT EXISTS user (
                    iduser INT PRIMARY KEY AUTO_INCREMENT,
                    username VARCHAR(45) UNIQUE,
                    password VARCHAR(100),
                    email VARCHAR(45) UNIQUE
                )`;

            connection.query(createBookTableQuery, (err, results) => {
                if (err) {
                    console.error(`Error al crear la tabla book: ${err}`);
                    return;
                }
                console.log('Tabla book: CREADA/EXISTENTE/GARANTIZADA');
            });

            connection.query(createUserTableQuery, (err, results) => {
                if (err) {
                    console.error(`Error al crear la tabla user: ${err}`);
                    return;
                }
                console.log('Tabla user: CREADA/EXISTENTE/GARANTIZADA');
            });

            connection.query(createStorageTableQuery, (err, results) => {
                if (err) {
                    console.error(`Error al crear la tabla storage: ${err}`);
                    return;
                }
                console.log('Tabla storage: CREADA/EXISTENTE/GARANTIZADA');
            });

            connection.query(createLibraryTableQuery, (err, results) => {
                if (err) {
                    console.error(`Error al crear la tabla library: ${err}`);
                    return;
                }
                console.log('Tabla library: CREADA/EXISTENTE/GARANTIZADA');
            });
        });
    });
});
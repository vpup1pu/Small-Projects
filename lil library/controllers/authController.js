const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const model = require('../models/model');
const config = require('../config/config');
const { Sequelize } = require('sequelize');

const User = model.User;
const Library = model.Library;
const Book = model.Book;
const Storage = model.Storage;
const db = model.sequelize;

//No utilice la función register tal cual la vimos en clase pues quise seguir lo más fiel posible la documentación de Sequelize 
const register = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Para chequear si el usuario o el mail ya fue registrado
    try {
        const existingUser = await User.findOne({ where: { username } }) || await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Sorry, username or email already exists' });
        }

        //Crear nuevo usuario
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email
        });

        const newStorage = await Storage.create({
            user_iduser: newUser.iduser,
        });

        const payload = { id: newUser.iduser, username: newUser.username, email: newUser.email };
        const secretKey = config.secretKey;
        const options = { expiresIn: config.tokenExpiresIn };

        const token = jwt.sign(payload, secretKey, options);

        res.status(201).json({ auth: true, token, message: 'User registered successfully', user: newUser, storage: newStorage });
    } catch (err) {
        console.error('Error durante registro: ', err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send({ message: 'Sorry, username not found. Please try again' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null, message: 'Wrong password, please try again' });
        }

        const payload = { id: user.id, username: user.username };
        const secretKey = config.secretKey;
        const options = { expiresIn: config.tokenExpiresIn };

        const token = jwt.sign(payload, secretKey, options);

        res.status(200).send({ auth: true, token });
    } catch (err) {
        console.error('Error al iniciar sesión: ', err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const showUserLibrary = async (req, res) => {
    const { idstorage } = req.params;

    try {
        const storage = await Storage.findByPk(idstorage);

        if (!storage) {
            return res.status(404).json({ error: 'Storage not found' });
        }

        const libraries = await Library.findAll({
            where: { idstorage },
            include: [
                {
                    model: Book,
                    attributes: ['title', 'author', 'pages'],
                }
            ],
            attributes: ['state'],
            raw: true,
        });

        res.json(libraries);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const searchBook = async (req, res) => {
    const { title, author } = req.query;

    try {
        const books = await Book.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { title: { [Sequelize.Op.like]: `%${title}%` } },
                    { author: { [Sequelize.Op.like]: `%${author}%` } }
                ]
            }
        });

        res.json(books);
    } catch (err) {
        console.error('Error during book search:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createBook = async (req, res) => {
    const { title, author, pages } = req.body;

    try {
        // Check if the book with the same title and author already exists
        const existingBook = await Book.findOne({
            where: {
                title: title,
                author: author
            }
        });

        if (existingBook) {
            return res.status(400).json({ error: 'Book with the same title and author already exists' });
        }

        // Create a new book
        const newBook = await Book.create({
            title,
            author,
            pages
        });

        res.status(201).json({ message: 'Book successfully added', book: newBook });
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addBooktoLibrary = async (req, res) => {
    const { idstorage } = req.params;
    const { idlibrary, iduser, idbook } = req.body;

    try {
        const existingEntry = await Library.findOne({
            where: {
                idstorage: idstorage,
                idbook: idbook
            }
        });

        if (!existingEntry) {
            const newEntry = await Library.create({
                idlibrary: idlibrary,
                idstorage: idstorage,
                iduser: iduser,
                idbook: idbook,
                state: 'Not Read Yet'
            });

            return res.json({ message: 'New Entry', newEntry });
        }

        return res.status(404).json({ error: 'Entry already exists' });
    } catch (err) {
        console.error('Error adding book to library:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const changeStatus = async (req, res) => {
    const { idstorage, idbook } = req.params;
    const { state } = req.body;

    try {
        const library = await Library.findOne({
            where: {
                idstorage: idstorage,
                idbook: idbook
            }
        });

        if (!library) {
            return res.status(404).json({ error: 'Library entry not found' });
        }

        // Actualizar el estado del libro
        library.state = state === 'Read' ? 'Read' : 'Not Read Yet';
        await library.save();

        res.json({ message: 'State changed', library });
    } catch (err) {
        console.error('Error changing state:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteBookFromLibrary = async (req, res) => {
    const { idbook } = req.params;

    try {
        const libraryEntry = await Library.findByPk(idbook);
        if (!libraryEntry) {
            return res.status(404).json({ error: 'Library entry not found' });
        }

        await libraryEntry.destroy();

        res.json({ message: 'Book deleted from library' });
    } catch (err) {
        console.error('Error deleting book from library:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    showUserLibrary,
    searchBook,
    createBook,
    addBooktoLibrary,
    changeStatus,
    deleteBookFromLibrary
};
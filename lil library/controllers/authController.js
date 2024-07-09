const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const config = require('../config/config');

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

        const payload = { id: newUser.iduser, username: newUser.username, email: newUser.email };
        const secretKey = config.secretKey;
        const options = { expiresIn: config.tokenExpiresIn };

        const token = jwt.sign(payload, secretKey, options);

        res.status(201).json({ auth: true, token, message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error durante registro: ', err);
        res.status(500).send({ error: 'Internal server error ' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
    if (!user){
        return res.status(404).send({ message: 'Sorry, username not found. Please try again' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid){
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

module.exports = {register, login};
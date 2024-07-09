const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(403).send({ auth: false, message: 'No header token provided' });
    };

    const token = authHeader.split('')[1];
    if (!token){
        return res.status(403).send({ auth: false, message: 'No token provided' });
    };

    const secretKey = config.secretKey;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    });
};

module.exports = authMiddleware;
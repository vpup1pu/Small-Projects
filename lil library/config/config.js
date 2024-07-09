//Configuración de los tokens JWT
module.exports = {
    secretKey: process.env.SECRET_KEY,
    tokenExpiresIn: process.env.TOKEN_EXPIRES_IN
};
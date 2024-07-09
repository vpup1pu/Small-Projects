const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

//Ruta protegida
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send({ message: `Welcome, ${req.username}!` });
});

module.exports = router;
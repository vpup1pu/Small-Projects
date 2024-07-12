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

router.get('/:idstorage', authController.showUserLibrary);
router.get('/search', authController.searchBook);
router.post('/create', authController.createBook);
router.post('/new/:idstorage', authController.addBooktoLibrary);
router.put('/changestatus/:idstorage/:idbook', authController.changeStatus);
router.delete('/delete/:idbook', authController.deleteBookFromLibrary);

module.exports = router;
const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listuser', verifyToken, userController.listuser);
router.put('/user/:id', userController.userUpdate);
router.delete('/user/:id', userController.userDelete);

module.exports = router;
const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listuser',verify, userController.listuser);
router.put('/user/:id', userController.userUpdate);
router.delete('/user/:id', userController.userDelete);

module.exports = router;
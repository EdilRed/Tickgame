const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).delete(userController.deleteAllUsers);

router.post('/login', userController.login);
router.post('/logout', userController.logout);


module.exports = router;
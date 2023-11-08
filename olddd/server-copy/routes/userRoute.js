const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Register route
router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/verifyUser', userController.verifyUser);
router.post('/validateToken', userController.validateToken);

module.exports = router;

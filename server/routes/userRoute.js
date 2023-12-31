const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { CheckAuth } = require("../middlewares/auth");
const {upload}=require("../server");


// Register route
router.post('/register',upload.array("files",3), userController.registerUser);
router.post('/login', userController.login);
router.post('/verifyUser', userController.verifyUser);
router.post('/validateToken', userController.validateToken);
router.post('/changePassword',CheckAuth, userController.changePassword);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/getUsers',CheckAuth, userController.getUsers);
router.get('/getUserID',CheckAuth, userController.getUserID);
router.post('/getUser',CheckAuth, userController.getUser);

module.exports = router;

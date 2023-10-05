
const express = require('express');
const router = express.Router();
const doctorControllers = require('./../controllers/doctorController');
const {CheckAuth}=require('./../middlewares/auth');



router.get('/',CheckAuth, doctorControllers.getAppointmentsPatients);




module.exports = router;
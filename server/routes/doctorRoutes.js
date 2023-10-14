const express = require("express");
const router = express.Router();
const doctorControllers = require("./../controllers/doctorController");
const { CheckAuth } = require("./../middlewares/auth");

router.get("/", doctorControllers.getAppointmentsPatients);

router.get("/appointments", doctorControllers.getAppointments);

router.route("/Alldoctors").get(CheckAuth,doctorControllers.getAllDoctors);
module.exports = router;

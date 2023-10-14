const express = require("express");
const router = express.Router();
const doctorControllers = require("./../controllers/doctorController");
const { CheckAuth } = require("./../middlewares/auth");

router.get("/", CheckAuth,doctorControllers.getAppointmentsPatients);

router.get("/appointments", CheckAuth,doctorControllers.getAppointments);

router.get("/Alldoctors", CheckAuth,doctorControllers.getAllDoctors); // Changed to GET
router.patch("/update-email", CheckAuth,doctorControllers.updateDoctorEmail);
router.get("/getPatients", CheckAuth,doctorControllers.getPatientsByDoctorId);

// Add the new route to get prescriptions and patient information by doctor and patient IDs
router.get("/:doctorId/:patientId/get-info", CheckAuth,doctorControllers.getPrescriptionsByDoctorAndPatient);

// ...

module.exports = router;

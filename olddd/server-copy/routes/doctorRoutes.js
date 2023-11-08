const express = require("express");
const router = express.Router();

const doctorControllers = require("../controllers/doctorController");

const { CheckAuth } = require("../middlewares/auth");

router.get("/", doctorControllers.getAppointmentsPatients);

router.get("/appointments", doctorControllers.getAppointments);

router.get("/Alldoctors", doctorControllers.getAllDoctors); // Changed to GET
router.put("/:userID/update-email", doctorControllers.updateDoctorEmail);
router.get("/:doctorId/getPatients", doctorControllers.getPatientsByDoctorId);






// Add the new route to get prescriptions and patient information by doctor and patient IDs
router.get("/:doctorId/:patientId/get-info", doctorControllers.getPrescriptionsByDoctorAndPatient);

// ...

module.exports = router;


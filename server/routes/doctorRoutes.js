const express = require("express");
const router = express.Router();
const doctorControllers = require("../controllers/doctorController");
const { CheckAuth } = require("../middlewares/auth");
const { upload } = require("../server");
router.get("/", CheckAuth, doctorControllers.getAppointmentsPatients);

router.get("/appointments", CheckAuth, doctorControllers.getAppointments);
router.patch(
  "/addAvaliableSlots",
  CheckAuth,
  doctorControllers.addAvaliableSlots
);
router.post(
  "/scheduleFollowUpPatient/:patientID/:selectedDateTime",
  CheckAuth,
  doctorControllers.scheduleFollowUpWithPatients
);
router.post(
  "/addHealthRecord/:username",
  CheckAuth,
  upload.array("files", 3),
  doctorControllers.addNewHealthRecordForPatient
);
// upload.array("files",1)
router.get("/Alldoctors", CheckAuth, doctorControllers.getAllDoctors); // Changed to GET
router.patch("/update-email", CheckAuth, doctorControllers.updateDoctorEmail);
router.get("/getPatients", CheckAuth, doctorControllers.getPatientsByDoctorId);
router.get("/allPrescriptions", doctorControllers.getAllPrescriptions);
// Add the new route to get prescriptions and patient information by doctor and patient IDs
router.get(
  "/:doctorId/:patientId/get-info",
  doctorControllers.getPrescriptionsByDoctorAndPatient
);

router.patch(
  "/rescheduleAppointmentPatient/:appointmentID/:newDateTime",
  CheckAuth,
  doctorControllers.rescheduleAppointment
);
router.patch(
  "/cancelAppointment/:appointmentID",
  CheckAuth,
  doctorControllers.cancelAppointment
);
// ...

module.exports = router;

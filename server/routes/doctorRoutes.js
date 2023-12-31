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
  doctorControllers.addAvailableSlots
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
router.get('/1234' , CheckAuth , doctorControllers.getDoctor);
router.patch('/update-profile' , CheckAuth , doctorControllers.updateDoctor);
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
router.post("/addPrescription", CheckAuth, doctorControllers.addPrescription);
router.post(
  "/viewPrescriptions",
  CheckAuth,
  doctorControllers.viewPatientPrescriptions
);
router.post(
  "/updatePrescription",
  CheckAuth,
  doctorControllers.updatePatientPrescriptions
);

router.get("/viewAllDoctors", doctorControllers.viewAllDoctors);

router.get("/getCurrDoc" , CheckAuth, doctorControllers.getCurrDoc)

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
router.patch(
  "/revokeFollowUpRequest",
  CheckAuth,
  doctorControllers.revokeFollowUpRequest
);
router.patch(
  "/acceptFollowUpRequest",
  CheckAuth,
  doctorControllers.acceptFollowUpRequest
);
// ...

module.exports = router;

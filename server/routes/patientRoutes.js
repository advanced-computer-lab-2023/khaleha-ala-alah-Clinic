const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const Prescriptions = require("../models/presecriptionsModel.js");
router
  .route("/")
  .get(CheckAuth, patientController.getAllPatients)
  .post(patientController.createPatient);

router.get("/patientdoctors", CheckAuth, patientController.getPatientDoctors);

router.get("/mydoctors", CheckAuth, patientController.getMyDoctors);

router.patch(
  "/add-family-members",
  CheckAuth,
  patientController.addFamilyMembers
);

// router.get(
//   "/presecriptions",
//   CheckAuth,
//   patientController.getPerscriptions
// );
router.get("/currentPatient", CheckAuth, patientController.getCurrentPatient);
// router.get(
//   "/DoctorAvailableSlots",
//   CheckAuth,
//   patientController.getAvailableAppointmentsOfDoctor
// );
router.get("/getAppointments", CheckAuth, patientController.getAppointments);
router.get(
  "/persecriptions",
  CheckAuth,
  patientController.getAllPersecriptions
);
router.get("/:id", patientController.getPatients);
router.get("/getDoctorApp/:id", patientController.GetDoctorAppointments);
router.get(
  "/doctorAppointments/:doctorID",
  CheckAuth,
  patientController.viewDoctorAppointmentsForMonth
);
router.post(
  "/SelectAppointment/:doctorID/:selectedDateTime",
  CheckAuth,
  patientController.SelectAppointmentPatient
);
router.post(
  "/SelectAppointmentFamilyMember/:doctorID/:selectedDateTime/:FamilyMember",
  CheckAuth,
  patientController.SelectAppointmentFamilyMember
);

module.exports = router;

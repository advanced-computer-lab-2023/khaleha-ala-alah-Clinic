const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");
const Prescriptions = require("./../models/presecriptionsModel.js");
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
router.patch(
  "/subscribeToPackage",
  CheckAuth,
  patientController.subscribeToPackage
);

router.patch(
  "/subscribeForFamilyMember",
  CheckAuth,
  patientController.subscribeForFamilyMember
);

router.patch(
  "/unsubscribeFromPackage",
  CheckAuth,
  patientController.cancelHealthPackage
);

router.patch(
  "/unsubscribeFromFamilyMember",
  CheckAuth,
  patientController.cancelFamilyMemberPackage
);

router.get(
  "/viewCurrentHealthPackage",
  CheckAuth,
  patientController.viewCurrentHealthPackage
);

router.get(
  "/viewFamilyMemberHealthPackages",
  CheckAuth,
  patientController.viewFamilyMemberHealthPackages
);

router.patch(
  "/addFamilyMemberUsingEmail",
  CheckAuth,
  patientController.addFamilyMemberUsingEmail
);

router.patch(
  "/addFamilyMemberUsingMobileNumber",
  CheckAuth,
  patientController.addFamilyMemberUsingMobileNumber
);

router.get(
  "/getHealthCareDetails",
  CheckAuth,
  patientController.getHealthCareDetails
);

router.get(
  "/getHealthCareDetailsForFamilyMember",
  CheckAuth,
  patientController.getHealthCareDetailsForFamilyMember
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
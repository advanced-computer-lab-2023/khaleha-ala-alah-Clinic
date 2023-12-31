const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const {upload}=require("../server");

const patientController = require("./../controllers/patientController");
const Prescriptions = require("./../models/presecriptionsModel.js");
const payForPackage = require("../controllers/paymentController");

router
  .route("/")
  .get(CheckAuth, patientController.getAllPatients)
  .post(patientController.createPatient);

// router
//   .route("/1234")
//   .get(CheckAuth, patientController.getPatient);
  // .patch(CheckAuth, patientController.updatePatient)
  // .delete(CheckAuth, patientController.deletePatient);
router.get('/1234',CheckAuth ,patientController.getPatient);
router.patch('/1234',CheckAuth ,patientController.updatePatient);
router.get("/getAllPatients", patientController.viewAllPatients);

router.post("/add-amount-Wallet", patientController.addAmountToWallet);
router.post("/remove-from-wallet", patientController.removeAmountFromWallet);
router.get("/amount-wallet/:userID", patientController.getAmountInWallet);
router.put("/wallet-amount-update", CheckAuth,patientController.updateWalletValue);
router.post("/save-stripe-token", CheckAuth, payForPackage);

router.get("/patientdoctors", CheckAuth, patientController.getPatientDoctors);

router.get("/mydoctors", CheckAuth, patientController.getMyDoctors);

router.patch(
  "/add-family-members",
  CheckAuth,
  patientController.addFamilyMembers
);

router.get("/currentPatient", CheckAuth, patientController.getCurrentPatient);

router.get("/getAppointments", CheckAuth, patientController.getAppointments);
router.get(
  "/persecriptions",
  CheckAuth,
  patientController.getPatientPrescribtions
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

router.get(
  "/getFamilyMembersPatients",
  CheckAuth,
  patientController.getFamilyMemberPatients
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
router.get(
  "/doctorAppointmentsWithoutAuth/:doctorID",
  patientController.viewDoctorAppointmentsForMonthWithoutAuth
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
// router for getPatientPrescribtions
/*router.get(
  "/getPatientPrescribtions",
  CheckAuth,
  patientController.getPatientPrescribtions
);*/

//router.get("/pre", CheckAuth, patientController.viewPrescriptions);

router.patch(
  "/rescheduleAppointment/:appointmentID/:newDateTime",
  CheckAuth,
  patientController.rescheduleAppointment
);
router.patch(
  "/rescheduleFamilyMemberAppointment/:appointmentID/:newDateTime/:familyMemberID",
  CheckAuth,
  patientController.rescheduleFamilyMemberAppointment
);
router.get(
  "/viewPrescriptions",
  CheckAuth,
  patientController.viewPrescriptions
);

router.patch(
  "/cancelAppointment/:appointmentID",
  CheckAuth,
  patientController.cancelAppointment
);

router.post(
  "/followUpRequest",
  CheckAuth,
  patientController.followUpRequestAppointment
);
router.post(
  "/viewHealtRecords",
  CheckAuth,
  patientController.viewMyHealthRecords
);
router.post("/addPatientHealthRecord",CheckAuth,upload.array("files",3), patientController.addPatientHealthRecord);
router.post("/deletePatientHealthRecord",CheckAuth ,patientController.deletePatientHealthRecord);


module.exports = router;

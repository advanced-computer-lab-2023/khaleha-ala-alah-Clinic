const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");

router.get("/:userID/getFamilyMembers", patientController.getFamilyMembersByUserID);

// router
//     .route('/')
//     .get(patientController.getAllPatients)
//     .post(patientController.createPatient);

router.get("/patientdoctors", patientController.getPatientDoctors);
router.get("/:userID/details", patientController.getDoctorDetailsByUserID);
router.get('/mydoctors',CheckAuth, patientController.getMyDoctors);
//router.get("/:id", patientController.getPatients);
router.patch("/add-family-members", CheckAuth ,patientController.addFamilyMembers);
router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);

router.get("/mydoctors", CheckAuth, patientController.getMyDoctors);

router.patch(
  "/add-family-members",
  CheckAuth,
  patientController.addFamilyMembers
);

router.get(
  "/presecriptions",
  CheckAuth,
  patientController.getPatientPrescribtions
);

router.get("/getappointments", patientController.getAppointments);

router.get("/:id", patientController.getPatients);

module.exports = router;

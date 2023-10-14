const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");
const Prescriptions = require("./../models/presecriptionsModel.js");
router
    .route('/')
    .get(CheckAuth,patientController.getAllPatients)
    .post(patientController.createPatient);

router.get("/patientdoctors", CheckAuth ,patientController.getPatientDoctors);

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
router.get("/currentPatient", CheckAuth ,patientController.getCurrentPatient);

router.get("/getAppointments",CheckAuth, patientController.getAppointments);
router.get('/persecriptions',CheckAuth,patientController.getAllPersecriptions);
router.get("/:id", patientController.getPatients);


module.exports = router;

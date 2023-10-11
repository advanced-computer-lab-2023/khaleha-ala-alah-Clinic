const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");

<<<<<<< HEAD
=======


router.get("/:userID/getFamilyMembers", patientController.getFamilyMembersByUserID);

>>>>>>> 7ca4a18 (farahat updates)
// router
//     .route('/')
//     .get(patientController.getAllPatients)
//     .post(patientController.createPatient);
<<<<<<< HEAD

router.get("/patientdoctors", patientController.getPatientDoctors);
=======
router.get("/:userID/details", patientController.getDoctorDetailsByUserID);
router.get('/mydoctors',CheckAuth, patientController.getMyDoctors);
router.get("/:id", patientController.getPatients);
router.patch("/add-family-members", CheckAuth ,patientController.addFamilyMembers);
router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);
>>>>>>> 7ca4a18 (farahat updates)

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

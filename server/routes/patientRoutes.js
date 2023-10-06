const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");

// router.get('/patient-stats', patientController.createPatient);
// add family members to patient

router
    .route('/')
    .get(patientController.getAllPatients)
    .post(patientController.createPatient);
// post('/addPatient' , patientController.createPatient);
// router.route('/addPatient').post( patientController.createPatient);
router.get("/:id", patientController.getPatients);
router.patch("/add-family-members/:id", patientController.addFamilyMembers);

router.get("/", CheckAuth, patientController.getAppointmentsDoctors);

router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);

module.exports = router;

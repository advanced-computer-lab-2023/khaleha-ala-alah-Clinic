const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();

router.route("/")
  .get(adminController.getAllAdmins)
  .post(adminController.addAdmin)
  router
  .delete("/delAdminDoctorPatient",adminController.delAdminDoctorPatient);

router.post("/addadmin",adminController.addAdmin)  

router.route("/pendingDoctors").get(adminController.viewPendingDoctors);

module.exports = router;

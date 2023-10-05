const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();

router
  .route("/")
  .get(adminController.getAllAdmins)
  .post(adminController.addAdmin)
  .delete(adminController.delAdminDoctorPatient);

//router.route("/:role/:name");

module.exports = router;

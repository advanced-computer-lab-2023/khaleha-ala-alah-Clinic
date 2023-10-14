const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();
const { CheckAuth } = require("./../middlewares/auth");


router.get("/pendingDoctors",CheckAuth,adminController.viewPendingDoctors);
router
  .route("/")
  .get(CheckAuth,adminController.getAllAdmins)
  .post(CheckAuth,adminController.addAdmin)
  .delete(CheckAuth,adminController.delAdminDoctorPatient);


module.exports = router;

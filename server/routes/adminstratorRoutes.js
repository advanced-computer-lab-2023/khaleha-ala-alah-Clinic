const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();
const { CheckAuth } = require("./../middlewares/auth");

router.post("/accept-reject-doctor", adminController.AcceptRejectDoctor);
router.get("/pendingDoctors", adminController.viewPendingDoctors);
router.get("/getPending", adminController.getPendingDoctors);
router.post("/approveOrRejectDoctor",CheckAuth, adminController.approveDoctor);

router
  .route("/")
  .get(adminController.getAllAdmins)
  .post(adminController.addAdmin)
  .delete(adminController.delAdminDoctorPatient);

module.exports = router;

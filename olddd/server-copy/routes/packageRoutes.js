const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

const { CheckAuth } = require("../middlewares/auth");

router.get("/", packageController.getAllPackages);
router.post("/createPackage", packageController.addPackage);
router.put("/updatePackage", packageController.updatePackage);
router.delete("/deletePackage", packageController.deletePackage);

module.exports = router;

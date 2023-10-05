const Admin = require("./../models/adminModel");
const Patient = require("./../models/patientModel"); // Replace with the appropriate model
const Doctor = require("./../models/doctorModel");
exports.getAllAdmins = async function (req, res) {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      status: "success",
      results: admins.length,
      data: {
        admins,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
// Create a new admin
exports.addAdmin = async (req, res) => {
  //   const { username, password } = req.body;

  // Validate input (you can add more validation)
  try {
    const newAdmin = await Admin.create(req.body);

    res.status(201).json({
      status: "success",
      data: { newAdmin: newAdmin },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// remove patient/admin/doctor from system

exports.delADP = async (req, res) => {
  const { role, name } = req.params;

  try {
    let deletedCount;

    if (role === "patient") {
      // Delete a patient
      const result = await Patient.deleteOne({ name });
      deletedCount = result.deletedCount;
    } else if (role === "admin") {
      // Delete an admin
      const result = await Admin.deleteOne({ name });
      deletedCount = result.deletedCount;
    } else if (role === "doctor") {
      // Delete a doctor
      const result = await Doctor.deleteOne({ name });
      deletedCount = result.deletedCount;
    } else {
      return res.status(400).json({ error: "Invalid role specified." });
    }

    if (deletedCount === 0) {
      return res.status(404).json({ error: `${role} not found.` });
    }

    return res.status(200).json({ message: `${role} deleted successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ...

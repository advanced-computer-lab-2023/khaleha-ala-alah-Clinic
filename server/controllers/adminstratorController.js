const Admin = require("./../models/adminModel");
const Patient = require("./../models/patientModel"); // Replace with the appropriate model
const Doctor = require("./../models/doctorModel");
const User = require("./../models/user");
// const faker = require("faker");
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
  try {
    const { username, password } = req.body;

    // Create a new admin user with the provided data
    const newAdmin = await Admin.create({
      username,
      password,
    });

    // Create a new user record with the role "admin" and email set to username@gmail.com
    const newUser = await User.create({
      username,
      password,
      role: "admin",
      email: `${username}@gmail.com`, // Set the email as username@gmail.com
      name: username, // Set the name to the username
    });

    res.status(201).json({
      status: "success",
      data: { newAdmin: newAdmin },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// remove patient/admin/doctor from system

exports.delAdminDoctorPatient = async (req, res) => {
  var { role, name } = req.body;
  name = name.trim();
  console.log(name);
  try {
    let deletedCount;

    if (role === "patient") {
      // Delete a patient
      const result = await Patient.deleteOne({ username: name });
      deletedCount = result.deletedCount;
    } else if (role === "admin") {
      // Delete an admin
      console.log("admin");
      const result = await Admin.deleteOne({ username: name });

      console.log(result + "hahahhahah" + object);
      deletedCount = result.deletedCount;
    } else if (role === "doctor") {
      // Delete a doctor
      // const result = await Admin.deleteOne({ username: name });

      const result = await Doctor.deleteOne({ username: name });
      deletedCount = result.deletedCount;
    } else {
      return res.status(400).json({ error: "Invalid role specified." });
    }

    if (deletedCount === 0) {
      return res.status(404).json({ error: `${role} not found.` });
    }
    const userDeleted = await User.deleteOne({ name });
    if (userDeleted.deletedCount === 0) {
      return res.status(404).json({ error: `User ${name} not found.` });
    }
    return res.status(200).json({ message: `${role} deleted successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ...

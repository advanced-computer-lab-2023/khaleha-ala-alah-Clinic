const Admin = require("../models/users/adminModel");
const Patient = require("../models/users/patientModel"); // Replace with the appropriate model
const Doctor = require("../models/users/doctorModel");
const User = require("../models/users/user");
const bcrypt = require("bcrypt");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const { sendEmail } = require("../utilities/emails");
const user = require("../models/users/user");

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

    if (!username || !password) {
      return res.status(400).json({ error: "Enter all fields." });
    }
    //check if user exists
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    user = new User({
      username: username,
      password: hashedPassword,
      role: "admin",
      name: username,
      verified: true,
    });
    await user.save();
    //create admin
    const admin = new Admin({
      username: username,
      userID: user._id,
    });
    await admin.save();
    return res.status(200).json({ message: "Admin created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// remove patient/admin/doctor from system

exports.delAdminDoctorPatient = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Enter all fields." });
    }
    //check if user exists
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    user = new User({
      username: username,
      password: hashedPassword,
      role: "admin",
      name: username,
      verified: true,
    });
    await user.save();
    //create admin
    const admin = new Admin({
      username: username,
      userID: user._id,
    });
    await admin.save();
    return res.status(200).json({ message: "Admin created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
  var { role, name } = req.body;
  name = name.trim();
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
    const userDeleted = await User.deleteOne({ username: name });
    if (userDeleted.deletedCount === 0) {
      return res.status(404).json({ error: `User ${name} not found.` });
    }
    return res.status(200).json({ message: `${role} deleted successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
exports.viewPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ status: "pending" }).select({
      Password: 0,
      confirmPassword: 0,
      _id: 0,
      __v: 0,
      userID: 0,
    });
    console.log(pendingDoctors);
    res.status(200).json({
      status: "success",
      results: pendingDoctors.length,
      data: {
        pendingDoctors,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "NO PENDING DOCTORS",
    });
  }
};

//approve and reject doctor
exports.approveDoctor = async (req, res) => {
  try {
    let admin = await Admin.findOne({ userID: req.user._id });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }
    const { type } = req.headers;
    if (type !== "approve" && type !== "reject") {
      return res.status(400).json({ error: "Invalid type specified." });
    }
    const { username } = req.body;
    let doctor = await Doctor.findOne({ username: username });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }
    //delete from gfs if rejected
    if (type === "reject") {
      gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      const files = doctor.files;
      files.forEach(async (file) => {
        await gfs.delete(file);
      });
    }
    const email = doctor.email;

    //update status
    type === "approve"
      ? (doctor.status = "accepted")
      : (doctor.status = "rejected");
    await doctor.save();
    doctorID = doctor.userID;
    doctor = await User.findOne({ _id: doctorID });
    type === "approve"
      ? (doctor.doctorApproved = true)
      : (doctor.doctorApproved = false);
    await doctor.save();

    //send email
    const subject = type === "approve" ? "Doctor Approved" : "Doctor Rejected";
    const html =
      type === "approve"
        ? "<h1>Congratulations! Your account has been approved.</h1>"
        : "<h1>Sorry! Your account has been rejected.</h1>";
    sendEmail(email, subject, html);

    if (type === "approve") {
      return res.status(200).json({ message: "Doctor approved successfully." });
    } else {
      //delete from user and doctor
      await user.deleteOne({ username: username });
      await Doctor.deleteOne({ username: username });
      return res.status(200).json({ message: "Doctor rejected successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
//view pending doctors
exports.getPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ status: "pending" });
    const conn = mongoose.connection;
    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });

    const doctors = await Promise.all(
      pendingDoctors.map(async (doctor) => {
        const downloadLinks = await Promise.all(
          doctor.files.map(async (file) => {
            const attachment = await gfs.find({ _id: file }).toArray();
            if (attachment.length > 0) {
              const downloadLink = attachment[0].filename;
              return downloadLink;
            }
            return null;
          })
        );

        return {
          username: doctor.username,
          name: doctor.name,
          birthdate: doctor.birthdate,
          affiliation: doctor.affiliation,
          educationalBackground: doctor.educationalBackground,
          speciality: doctor.speciality,
          files: downloadLinks.filter((link) => link !== null),
        };
      })
    );

    res.status(200).json({
      status: "success",
      results: pendingDoctors.length,
      data: {
        pendingDoctors: doctors,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Error retrieving pending doctors",
    });
  }
};
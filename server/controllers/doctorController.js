const Appointment = require("../models/appointmentModel");
const patientModel = require("../models/users/patientModel");
const Doctor = require("../models/users/doctorModel");
const Patient = require("../models/users/patientModel"); // Import your Patient model
const Prescription = require("../models/presecriptionsModel"); // Import your Prescription model
const Wallet = require("../models/wallet");
const mongoose = require("mongoose");
const followUpRequestAppointment = require("./../models/followUpRequestModel");
const { promises } = require("nodemailer/lib/xoauth2");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const handlebars = require("handlebars");
const stream = require("stream");
const moment = require("moment");

const conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
});

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userID: req.user._id });
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.updateDoctor = async (req, res) => {
  // validate input name , email , phone number and birthdate , affiliation , speciality , Educational Background , Hourly Rate if any of them
  // is not valid return error
  // else update the doctor
  // return the updated doctor
  try {
    const doctor = await Doctor.findOne({ userID: req.user._id });
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    const {
      name,
      email,
      phoneNumber,
      birthDate,
      affiliation,
      speciality,
      educationalBackground,
      hourlyRate,
    } = req.body;
    if (name) {
      doctor.name = name;
    }
    if (email) {
      doctor.email = email;
    }
    if (birthDate) {
      doctor.birthDate = birthDate;
    }
    if (affiliation) {
      doctor.affiliation = affiliation;
    }
    if (speciality) {
      doctor.speciality = speciality;
    }
    if (educationalBackground) {
      doctor.educationalBackground = educationalBackground;
    }
    if (hourlyRate) {
      doctor.hourlyRate = hourlyRate;
    }
    await doctor.save();
    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.getAmountInWallet = async (req, res) => {
  try {
    const userID = req.params.userID.trim();

    const userWallet = await Wallet.findOne({ userID });

    if (userWallet) {
      // Retrieve the current amount in the wallet
      const amountInWallet = userWallet.amount;

      // Send the amount in the wallet as a response
      res.json({ success: true, amountInWallet });
    } else {
      // Send an error response if user wallet not found
      res
        .status(404)
        .json({ success: false, message: "User wallet not found" });
    }
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error retrieving amount from wallet",
      error: error.message,
    });
  }
};
// Function to add amount to the wallet or create a new wallet if not available
exports.addAmountToWallet = async (req, res) => {
  try {
    const { userID, amount } = req.body;
    let userWallet = await Wallet.findOne({ userID });

    if (!userWallet) {
      // User wallet not found, create a new wallet
      userWallet = new Wallet({ userID });
    }

    // Add amount to the wallet
    await userWallet.addAmount(amount);

    // Send a success response
    res.json({ success: true, message: "Amount added to wallet successfully" });
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error adding amount to wallet",
      error: error.message,
    });
  }
};

// Function to remove amount from the wallet
exports.removeAmountFromWallet = async (req, res) => {
  try {
    const { userID, amount } = req.body;
    const userWallet = await Wallet.findOne({ userID });

    if (userWallet) {
      // Attempt to remove amount (throws error if insufficient funds)
      await userWallet.removeAmount(amount);

      // Send a success response
      res.json({
        success: true,
        message: "Amount removed from wallet successfully",
      });
    } else {
      // Send an error response if user wallet not found
      res
        .status(404)
        .json({ success: false, message: "User wallet not found" });
    }
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error removing amount from wallet",
      error: error.message,
    });
  }
};

exports.getPrescriptionsByDoctorAndPatient = async function (req, res) {
  try {
    const doctorId = req.params.doctorId; // Get the doctor ID from the request parameters
    const patientId = req.params.patientId; // Get the patient ID from the request parameters

    // Find prescriptions with the given doctor ID and patient ID
    const prescriptions = await Prescription.find({
      DoctorID: doctorId,
      PatientID: patientId,
    });

    if (!prescriptions) {
      return res.status(404).json({
        status: "fail",
        message: "Prescriptions not found",
      });
    }

    // Find the patient by their ID
    const patient = await Patient.findOne({ userID: patientId });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        prescriptions,
        patient,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
exports.getAllPrescriptions = async function (req, res) {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json({
      status: "success",
      results: prescriptions.length,
      data: {
        prescriptions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getPatientsByDoctorId = async function (req, res) {
  try {
    const conn = mongoose.connection;
    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
    // Get the doctor ID from the request parameters

    // Find all appointments with the given doctor ID
    const appointments = await Appointment.find({ DoctorID: req.user._id });

    // Extract unique patient IDs from the appointments
    const patientIds = [
      ...new Set(appointments.map((appointment) => appointment.PatientID)),
    ];

    // Find patients with the extracted patient IDs
    const patients = await Patient.find({ userID: { $in: patientIds } });

    //get files names
    const patientWithFiles = await Promise.all(
      patients.map(async (patient) => {
        const downloadLinks = await Promise.all(
          patient.files.map(async (file) => {
            const attachment = await gfs.find({ _id: file }).toArray();
            if (attachment.length > 0) {
              const downloadLink = attachment[0].filename;
              return downloadLink;
            }
            return null;
          })
        );
        return {
          _id: patient._id,
          userID: patient.userID,
          username: patient.username,
          name: patient.name,
          email: patient.email,
          gender: patient.gender,
          dateOfBirth: patient.dateOfBirth,
          mobileNumber: patient.mobileNumber,
          packageName: patient.packageName,
          doctorsDiscount: patient.doctorsDiscount,
          medicalDiscount: patient.medicalDiscount,
          familyDiscount: patient.familyDiscount,
          selfSubscription: patient.selfSubscription,
          packageEndDate: patient.packageEndDate,
          files: downloadLinks.filter((link) => link !== null),
          familyMembers: patient.familyMembers,
          __v: patient.__v,
        };
      })
    );

    res.status(200).json({
      status: "success",
      data: {
        patients: patientWithFiles,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.getAllDoctors = async function (req, res) {
  try {
    const Doctors = await Doctor.find({ status: { $ne: "pending" } });
    res.status(200).json({
      status: "success",
      results: Doctors.length,
      data: {
        Doctors,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
// Update the model path if necessary

exports.updateDoctorEmail = async function (req, res) {
  try {
    // Assuming you pass the user's ID as a parameter
    const newEmail = req.body.email; // Assuming you send the new email in the request body
    const newhourlyRate = req.body.hourlyRate;
    const newaffiliation = req.body.affiliation;
    // Validate the new email using the validator library if needed

    // Update the doctor's email in the database
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { userID: req.user._id },
      {
        email: newEmail,
        hourlyRate: newhourlyRate,
        affiliation: newaffiliation,
      },

      { new: true } // This option returns the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        status: "error",
        message: "Doctor not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedDoctor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
exports.getAppointmentsPatients = async function (req, res) {
  try {
    //console.log(req.user._id);
    //let doctor = "651f16c855b8273fedf03c93";
    const patientsID = await Appointment.find({
      DoctorID: req.user._id,
    });
    console.log(patientsID);
    const allPatients = await patientModel.find();
    const patients = [];

    for (let i = 0; i < allPatients.length; i++) {
      for (let j = 0; j < patientsID.length; j++) {
        if (allPatients[i].userID == patientsID[j].PatientID) {
          patients.push(allPatients[i]);
          break;
        }
      }
    }
    res.status(200).json({
      patients,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getAppointments = async function (req, res) {
  try {
    //const doctor = "651f16c855b8273fedf03c93";
    const appointments = await Appointment.find({
      DoctorID: req.user._id,
    });
    // console.log(appointments);
    res.status(200).json({
      appointments,
    });
    console.log(appointments);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.addAvailableSlots = async function (req, res) {
  try {
    // Check that the doctor has status accepted
    const doctor = await Doctor.findOne({
      userID: req.user._id,
      status: "accepted",
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    const newSlots = req.body.fixedSlots;

    const newSlotKeys = newSlots.map((slot) => `${slot.day}-${slot.hour}`);
    const existingSlotKeys = doctor.fixedSlots.map(
      (slot) => `${slot.day}-${slot.hour}`
    );
    const duplicateSlotKeys = newSlotKeys.filter((key) =>
      existingSlotKeys.includes(key)
    );

    if (duplicateSlotKeys.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Slot already exists",
        duplicates: duplicateSlotKeys,
      });
    }

    doctor.fixedSlots.push(...req.body.fixedSlots);

    await doctor.save();

    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.scheduleFollowUpWithPatients = async function (req, res) {
  try {
    console.log("here");
    const { patientID, selectedDateTime } = req.params; // Use req.body instead of req.params

    // Ensure they have the required permissions
    const doctor = await Doctor.findOne({ userID: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "doctor not found",
      });
    }

    // Check if the selected date and time are available for the doctor
    if (!patientID || !selectedDateTime) {
      return res.status(400).json({
        status: "fail",
        message: "Patient ID and selected date/time are required.",
      });
    }

    const patient = await Patient.findOne({ userID: patientID });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "patient not found.",
      });
    }

    // Get the doctor's available time slots
    const availableTimeSlots = doctor.fixedSlots;

    // Check if the selected date and time match any of the available time slots
    const isTimeSlotAvailable = availableTimeSlots.some((slot) => {
      const slotDay = slot.day;
      const slotTime = slot.hour;

      // Convert the selectedDateTime to match the format in the slots
      const selectedTime = new Date(selectedDateTime);
      const selectedDay = selectedTime.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const selectedHour = selectedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      // console.log("slotDay:-- " + slotDay + "selectedDay:- " + selectedDay + " selectedHour:-  " + selectedHour + " slothour:- " + slotTime);
      // console.log(slotDay === selectedDay && slotTime === selectedHour);
      return slotDay === selectedDay && slotTime === selectedHour;
    });
    if (!isTimeSlotAvailable) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are not within the doctor's available time slots.",
      });
    }

    // Check if the selected appointment time is already booked
    const isAppointmentBooked = await Appointment.findOne({
      DoctorID: req.user._id,
      timedAt: new Date(selectedDateTime),
    });

    if (isAppointmentBooked) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are already booked by another patient.",
      });
    }

    // Create a new appointment
    const appointment = new Appointment({
      PatientID: patientID, // Assuming you have patient information in req.user
      DoctorID: req.user._id,
      timedAt: new Date(selectedDateTime),
    });

    // Save the appointment to the database
    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment scheduled successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.addNewHealthRecordForPatient = async function (req, res) {
  try {
    const appointment = await Appointment.findOne({ DoctorID: req.user._id });
    const patient = await Patient.findOne({ username: req.params.username });
    if (!patient) {
      res.status(404).json({
        status: "fail",
        message: "patient is not found",
      });
    }
    const files = req.files;
    let Filepathes = [];
    if (files) {
      Filepathes = req.files.map((file) => file.id);
    }
    await patient.files.push(...Filepathes);
    await patient.save();
    res.status(200).json({
      status: "success",
      message: "file upload successfully ",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// Reschedule an appointment for a patient
exports.rescheduleAppointment = async function (req, res) {
  try {
    const { appointmentID, newDateTime } = req.params; // Get appointmentID and newDateTime from params
    // Find the appointment by its ID
    const appointment = await Appointment.findById(appointmentID);

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found",
      });
    }

    // Check if the doctor making the request is the same as the appointment's DoctorID
    if (appointment.DoctorID !== req.user._id) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to reschedule this appointment",
      });
    }

    // Parse the newDateTime string to a Date object
    const newAppointmentTime = new Date(newDateTime);

    // Update the appointment time
    appointment.timedAt = newAppointmentTime;
    appointment.isRescheduled = true; // Set the isRescheduled flag to true
    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment rescheduled successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

// add prescription to patient
exports.addPrescription = async function (req, res) {
  try {
    const { patient, medications } = req.body;
    const doctor = await Doctor.findOne({ userID: req.user._id });
    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      "..",
      "utilities",
      "prescription-template.html"
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
    // Create a Handlebars template function
    const templateFunction = handlebars.compile(htmlTemplate);
    // Replace placeholders with actual data
    const filledTemplate = templateFunction({
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      doctorAffiliation: doctor.affiliation,
      doctorSpeciality: doctor.speciality,

      patientName: patient.name,
      patientGender: patient.gender,
      patientDateOfBirth: moment(patient.dateOfBirth).format("DD/MM/YYYY"),

      issuedDate: new Date().toLocaleDateString("en-US", {}),

      medicationsList: medications,
    });
    // Options for pdf creation
    const pdfOptions = {
      format: "Letter",
    };
    // Convert HTML to PDF
    pdf.create(filledTemplate, pdfOptions).toBuffer(async (err, pdfBuffer) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      } else {
        // Create a write stream for GridFS
        const writeStream = gfs.openUploadStream("prescription.pdf", {
          contentType: "application/pdf",
        });

        writeStream.on("finish", () => {
          console.log("File uploaded to GridFS");
        });

        // Pipe the PDF buffer to the write stream
        const bufferStream = new stream.PassThrough();
        bufferStream.end(pdfBuffer);
        await bufferStream.pipe(writeStream);

        // Save the prescription to the database
        const prescription = new Prescription({
          doctorID: req.user._id,
          patientID: patient.userID,
          medications,
          pdfFileID: writeStream.id,
        });
        await prescription.save();

        // Set the response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "inline; filename=prescription.pdf"
        );

        // Send the PDF buffer as the response
        res.status(200).send(pdfBuffer);
      }
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

//view patient prescriptions
exports.viewPatientPrescriptions = async function (req, res) {
  try {
    const { patient } = req.body;
    const doctorID = req.user._id;
    const prescriptions = await Prescription.find({
      doctorID,
      patientID: patient.userID,
    });
    const prescriptionsWithFiles = await Promise.all(
      prescriptions.map(async (prescription) => {
        if (prescription.pdfFileID) {
          const file = await gfs
            .find({ _id: prescription.pdfFileID })
            .toArray();
          const fileStream = gfs.openDownloadStream(prescription.pdfFileID);
          const chunks = [];
          return new Promise((resolve, reject) => {
            fileStream.on("data", (chunk) => {
              chunks.push(chunk);
            });
            fileStream.on("end", () => {
              const fileData = Buffer.concat(chunks);
              resolve({ ...prescription.toObject(), fileData });
            });
            fileStream.on("error", (error) => {
              reject(error);
            });
          });
        } else {
          return prescription.toObject();
        }
      })
    );
    res.status(200).json({ prescriptions: prescriptionsWithFiles });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//update patient prescriptions
exports.updatePatientPrescriptions = async function (req, res) {
  try {
    const { prescriptionObject, medications } = req.body;
    const prescription = await Prescription.findOne({
      _id: prescriptionObject._id,
    });
    const patient = await Patient.findOne({
      userID: prescriptionObject.patientID,
    });
    const doctor = await Doctor.findOne({
      userID: prescriptionObject.doctorID,
    });
    if (!prescription) {
      return res.status(404).json({
        status: "fail",
        message: "Prescription not found",
      });
    }
    prescription.medications = medications;
    const pdfFileID = prescription.pdfFileID;
    if (pdfFileID) {
      await gfs.delete(pdfFileID);
    }
    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      "..",
      "utilities",
      "prescription-template.html"
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    // Create a Handlebars template function
    const templateFunction = handlebars.compile(htmlTemplate);

    // Replace placeholders with actual data
    const filledTemplate = templateFunction({
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      doctorAffiliation: doctor.affiliation,
      doctorSpeciality: doctor.speciality,

      patientName: patient.name,
      patientGender: patient.gender,
      patientDateOfBirth: moment(patient.dateOfBirth).format("DD/MM/YYYY"),

      issuedDate: moment(prescription.date).format("DD/MM/YYYY"),

      medicationsList: medications,
    });

    // Options for pdf creation
    const pdfOptions = {
      format: "Letter",
    };

    // Convert HTML to PDF
    pdf.create(filledTemplate, pdfOptions).toBuffer(async (err, pdfBuffer) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      } else {
        // Create a write stream for GridFS
        const writeStream = gfs.openUploadStream("prescription.pdf", {
          contentType: "application/pdf",
        });

        writeStream.on("finish", () => {
          console.log("File uploaded to GridFS");
        });

        // Pipe the PDF buffer to the write stream
        const bufferStream = new stream.PassThrough();
        bufferStream.end(pdfBuffer);
        await bufferStream.pipe(writeStream);

        // Save the prescription to the database
        prescription.pdfFileID = writeStream.id;
        await prescription.save();
      }
    });
    return res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// docotr cancel an appointment and patient recieves full refund
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.params;

    // Find the appointment by its ID
    const appointment = await Appointment.findOne({ _id: appointmentID });

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found",
      });
    }
    // Get the doctor associated with the appointment
    const doctor = await Doctor.findOne({ userID: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    // Get the patient associated with the appointment
    const patient = await Patient.findOne({ userID: appointment.PatientID });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    // Calculate the refund amount based on the time difference
    let refundAmount = 0;
    refundAmount = (doctor.hourlyRate / 2) * (1 - patient.doctorsDiscount);

    //console.log("before wallet");

    await Wallet.findOneAndUpdate(
      { userID: patient.userID },
      { $inc: { amount: refundAmount } }
    );

    //console.log("Updated wallet");

    // Mark the appointment as canceled
    appointment.isCancelled = true;

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment canceled successfully",
      refundAmount: refundAmount,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.revokeFollowUpRequest = async (req, res) => {
  try {
    const patientID = req.body.patientID;
    const doctor = await Doctor.findOne({ userID: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    const FollowUpRequestAppointments = await followUpRequestAppointment.find({
      PatientID: patientID,
      DoctorID: req.user._id,
      status: "Pending",
    });
    for (let i = 0; i < FollowUpRequestAppointments.length; i++) {
      console.log(FollowUpRequestAppointments[i]);
      if (FollowUpRequestAppointments[i].status == "Pending") {
        FollowUpRequestAppointments[i].status = "Rejected";
        await FollowUpRequestAppointments[i].save();
      }
    }
    const appointment = await Appointment.findOneAndDelete({
      DoctorID: req.user._id,
      PatientID: req.body.PatientID,
      isPending : "True"
    });

    res.status(200).json({
      status: "success",
      message: "Follow Up Request revoked successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.acceptFollowUpRequest = async (req, res) => {
  try {
    const patientID = req.body.patientID;
    const doctor = await Doctor.findOne({ userID: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    const FollowUpRequestAppointments = await followUpRequestAppointment.find({
      PatientID: patientID,
      DoctorID: req.user._id,
      status: "Pending",
    });
    for (let i = 0; i < FollowUpRequestAppointments.length; i++) {
      console.log(FollowUpRequestAppointments[i]);
      if (FollowUpRequestAppointments[i].status == "Pending") {
        FollowUpRequestAppointments[i].status = "Accepted";
        await FollowUpRequestAppointments[i].save();
      }
    }
    const appointment = await Appointment.findOne({
      DoctorID: req.user._id,
      PatientID: req.body.PatientID,
      isPending : "True"
    });
    console.log('hahaha');
    console.log(req.body)
    console.log(appointment);
    if (appointment) {
      appointment.isPending = "False";
      await appointment.save();
    }

    res.status(200).json({
      status: "success",
      message: "Follow Up Request Accepted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.viewAllDoctors = async function (req, res) {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      status: "success",
      results: doctors.length,
      data: {
        doctors,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getCurrDoc = async function (req, res) {
  try {
    console.log("HOLA");
    const doctor = await Doctor.findOne({ userID: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        doctor: doctor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

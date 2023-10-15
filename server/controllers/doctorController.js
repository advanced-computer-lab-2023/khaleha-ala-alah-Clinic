const Appointment = require("../models/appointmentModel");
const patientModel = require("../models/users/patientModel");
const Doctor = require("../models/users/doctorModel");
const Patient = require("../models/users/patientModel"); // Import your Patient model
const Prescription = require("../models/presecriptionsModel"); // Import your Prescription model

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

exports.getPatientsByDoctorId = async function (req, res) {
  try {
    // Get the doctor ID from the request parameters

    // Find all appointments with the given doctor ID
    const appointments = await Appointment.find({ DoctorID: req.user._id });

    // Extract unique patient IDs from the appointments
    const patientIds = [
      ...new Set(appointments.map((appointment) => appointment.PatientID)),
    ];

    // Find patients with the extracted patient IDs
    const patients = await Patient.find({ userID: { $in: patientIds } });

    res.status(200).json({
      status: "success",
      data: {
        patients,
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
    let doctor = "651f16c855b8273fedf03c93";
    const patientsID = await Appointment.find({
      DoctorID: doctor,
    }).select({ PatientID: 1, _id: 0 });
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
    const doctor = "651f16c855b8273fedf03c93";
    const appointments = await Appointment.find({
      DoctorID: doctor,
    });
    console.log(appointments);
    res.status(200).json({
      appointments,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
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

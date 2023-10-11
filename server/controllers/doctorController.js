const Appointment = require("../models/appointmentModel");
const patientModel = require("../models/users/patientModel");
const Doctor = require("../models/users/doctorModel");
exports.getAllDoctors = async function (req, res) {
  try {
    const Doctors = await Doctor.find();
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

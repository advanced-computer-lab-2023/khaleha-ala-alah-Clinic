const Patient = require("./../models/patientModel");
const Doctors = require("./../models/doctorModel");
const Appointments = require("./../models/appointmentModel");

exports.getAppointmentsPatients = async function (req, res) {
  try {
    console.log(req.body.id);
    const patientsID = await Appointments.find({
      PatientID: req.body.id,
    }).select({ PatiendID: 1, _id: 0 });
    console.log(patientsID + "    AAA");
    const allPatients = await Patient.find();
    const patients = [];

    for (let i = 0; i < allPatients.length; i++) {
      for (let j = 0; j < patientsID.length; j++) {
        if (allPatients[i]._id == patientsID[j].DoctorID) {
          patients.push(allPatients[i].name);
          break;
        }
      }
    }
    console.log("ALO");
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

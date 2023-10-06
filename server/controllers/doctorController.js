const Appointment = require('../models/appointmentModel');
const patientModel = require('../models/users/patientModel');


exports.getAppointmentsPatients = async function (req, res) {
    try {
      console.log(req.user._id);
      const patientsID = await Appointment.find({
        DoctorID: req.user._id,
      }).select({ PatientID: 1, _id: 0 });
      console.log(patientsID);
      const allPatients = await patientModel.find();
      const patients = [];
  
      for (let i = 0; i < allPatients.length; i++) {
        for (let j = 0; j < patientsID.length; j++) {
          if (allPatients[i].userID == patientsID[j].PatientID) {
            patients.push(allPatients[i].name);
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

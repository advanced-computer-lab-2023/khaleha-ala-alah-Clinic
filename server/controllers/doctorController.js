const Appointment = require("../models/appointmentModel");
const patientModel = require("../models/users/patientModel");
const Doctor = require("../models/users/doctorModel");
const Patient = require("../models/users/patientModel"); // Import your Patient model
const Prescription = require("../models/presecriptionsModel"); // Import your Prescription model
const mongoose = require("mongoose");
const { promises } = require("nodemailer/lib/xoauth2");

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
    const patient = await Patient.findOne({userID:patientId});

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
    const patientIds = [...new Set(appointments.map((appointment) => appointment.PatientID))];

    // Find patients with the extracted patient IDs
    const patients = await Patient.find({ userID: { $in: patientIds } });

    //get files names
    const patientWithFiles=await Promise.all(
      patients.map(async (patient)=>{
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
          gender:patient.gender,
          dateOfBirth:patient.dateOfBirth,
          mobileNumber:patient.mobileNumber,
          packageName:patient.packageName,
          doctorsDiscount:patient.doctorsDiscount,
          medicalDiscount:patient.medicalDiscount,
          familyDiscount:patient.familyDiscount,
          selfSubscription:patient.selfSubscription,
          packageEndDate:patient.packageEndDate,
          files: downloadLinks.filter((link) => link !== null),
          familyMembers:patient.familyMembers,
          __v: patient.__v,
        }
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
}


exports.getAllDoctors = async function (req, res) {
  try {
    const Doctors = await Doctor.find({status: {$ne: 'pending'}});
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
      { email: newEmail ,
        hourlyRate : newhourlyRate ,
        affiliation : newaffiliation
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
}
exports.getAppointmentsPatients = async function (req, res) {
  try {
    //console.log(req.user._id);
    //let doctor = "651f16c855b8273fedf03c93";
    const patientsID = await Appointment.find({
      DoctorID: req.user._id,
    }).select({ PatientID: 1, _id: 0 });
    // console.log(patientsID);
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
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.addAvaliableSlots = async function(req,res){
  try{
    //check that doctor has status accepted
    const doctor = await Doctor.findOne({userID:req.user._id,status:'accepted'});
    // console.log(req.body + "  " + doctor);
    if(!doctor){
      return res.status(404).json({ error: "Doctor not found." });
    }
    doctor.fixedSlots.push(...req.body.fixedSlots);
    await doctor.save();
    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  }catch(err){
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}
exports.scheduleFollowUpWithPatients = async function(req,res){
      try {
        console.log("here")
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
}
exports.addNewHealthRecordForPatient = async function(req,res){
  try{
    const appointment = await Appointment.findOne({DoctorID : req.user._id});
    const patient = await Patient.findOne({username: req.body.username});
  if(!patient){
    res.status(404).json({
      status: "fail",
      message: "patient is not found"
    })
  }
  const files = req.files;
      let Filepathes = [];
      if(files){
        Filepathes = req.files.map((file) => file.id);
      }
  patient.files.push(Filepathes);
  await patient.save();
  res.status(200).json({
    status: "success",
    message: "file upload successfully "
  });
  }
  catch(err){
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }

}

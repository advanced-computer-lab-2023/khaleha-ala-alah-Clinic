const Patient = require("../models/users/patientModel");
const Doctors = require("../models/users/doctorModel");
const Appointments = require("./../models/appointmentModel");
const Prescriptions = require("./../models/presecriptionsModel.js");

//examples

//examples -- we need api bellow to test with them
// get patient and create patient written here to test add family members

// get all patients

exports.getMyDoctors = async function (req, res) {
  try {
    const patient = req.user._id;
    const doctorIds = await Appointments.distinct("DoctorID", {
      PatientID: patient,
    });
    const doctors = await Doctors.find({ userID: { $in: doctorIds } });
    const doctorNames = doctors.map((doctor) => {
      doctor.name, doctor.speciality;
    });
    res.status(200).json({
      doctorNames,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
exports.getAllPatients = async function (req, res) {
  try {
    let admin = await Admin.findOne({ userID: req.user._id });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }
    const patients = await Patient.find();
    res.status(200).json({
      status: "success",
      results: patients.length,
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getPatients = async function (req, res) {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getCurrentPatient = async function (req, res) {
  try {
    //const patientID = "6527622d2075657b32b6c110"; //req.user._id;
    const patient = await Patient.findOne({ userID: req.user._id });
    console.log(patient);
    res.status(200).json({
      status: "success",
      data: {
        user: patient,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.createPatient = async function (req, res) {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPatient,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.addFamilyMembers = async function (req, res) {
  try {
    console.log(req.user._id);
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Create a new family member based on the request body
    const newFamilyMember = {
      name: req.body.name,
      nationalID: req.body.nationalID,
      age: req.body.age,
      gender: req.body.gender,
      relationToPatient: req.body.relationToPatient,
    };
    console.log(newFamilyMember);

    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(newFamilyMember);
    // Save the patient with the updated familyMembers array
    const updatedPatient = await patient.save();
    res.status(201).json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};
exports.getPerscriptions = async function (req, res) {
  console.log("ENTERED METHOD");
  try {
    const prescriptions = await Appointments.find({
      PatientID: req.user._id,
    });
    // const allDoctors = await Doctors.find();
    // const doctors = [];

    // for (let i = 0; i < allDoctors.length; i++) {
    //   for (let j = 0; j < doctorsID.length; j++) {
    //     if (allDoctors[i]._id == doctorsID[j].DoctorID) {
    //       doctors.push(allDoctors[i]);
    //       break;
    //     }
    //   }
    // }
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
exports.getPatientPrescribtions = async function (req, res) {
  try {
    const prescriptions = await Prescriptions.find({
      PatientID: req.user._id,
    });

    //newPresctibtion.save();
    res.status(200).json({
      data: prescriptions,
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
    console.log("ENTERED METHOD");
    const appointments = await Appointments.find({
      PatientID: req.user._id,
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

exports.getPatientDoctors = async function (req, res) {
  try {
    const patient = "651ee41994ed6dc1e163c4df";
    const doctorIds = await Appointments.find({
      PatientID: req.user._id,
    }).distinct("DoctorID", {
      PatientID: patient,
    });
    //const doctors = await Doctors.find({ userID: { $in: doctorIds } });
    const doctors = [];
    const allDoctors = await Doctors.find();

    for (let i = 0; i < doctorIds.length; i++) {
      for (let j = 0; j < allDoctors.length; j++) {
        if (allDoctors[j].userID === doctorIds[i]) {
          doctors.push(allDoctors[j]);
          break;
        }
      }
    }

    res.status(200).json({
      doctors,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
exports.getAllPersecriptions = async function (req, res) {
  try {
    console.log("ENTERED METHOD");
    const prescriptions = await Prescriptions.find({
      PatientID: req.user._id,
    });
    console.log(prescriptions);
    res.status(200).json({
      status: "success",
      results: prescriptions.length,
      data: {
        prescriptions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
exports.GetDoctorAppointments = async function (req, res) {
  try {
    //const doctor = "651f16c855b8273fedf03c93";
    const appointments = await Appointments.find({
      DoctorID: req.params.id,
    });
    console.log("enter");
    //console.log(appointments);
    res.status(200).json({
      status: "success",
      data: {
        Appointments: appointments,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// get appointments of selected doctor
// exports.getAvailableAppointmentsOfDoctor = async function (req, res) {
//   try {
//     const doctor = req.body.id;
//     const appointments = await Appointments.find({
//       DoctorID: doctor,
//       PatientID: null,
//     });
//     res.status(200).json({
//       appointments,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };
exports.viewDoctorAppointmentsForMonth = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const { doctorID } = req.params; // Get doctorID from route parameters

    // Find the selected doctor by their ID
    const doctor = await Doctors.findOne({ userID: doctorID });

    if (!doctor) {
      return res
        .status(404)
        .json({ status: "error", message: "Doctor not found" });
    }

    const currentDate = new Date(); // Get the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based

    // Generate a list of time slots for the current month
    const startDate = new Date(currentYear, currentMonth - 1, 1); // current month is 0-based
    const endDate = new Date(currentYear, currentMonth + 2, 0);
    // const endDate = new Date(year, currentMonth - 1, 7);

    const availableTimeSlots = [];

    for (const slot of doctor.fixedSlots) {
      const currentDay = new Date(startDate);
      while (currentDay <= endDate) {
        if (currentDay.getDay() === getDayIndex(slot.day)) {
          // Parse the time from "9:45 AM" format to 24-hour format
          const timeParts = slot.hour.split(" ");
          const time = timeParts[0];
          const isPM = timeParts[1] === "PM";
          let [hours, minutes] = time.split(":").map(Number);

          if (isPM && hours !== 12) {
            hours += 12;
          } else if (!isPM && hours === 12) {
            hours = 0; // Midnight (12:00 AM) is represented as 0 in 24-hour format
          }

          const appointmentTime = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            currentDay.getDate(),
            hours,
            minutes,
            0
          );
          if (appointmentTime >= currentDate) {
            const isBooked = await isAppointmentBooked(
              doctorID,
              appointmentTime
            );
            if (!isBooked) {
              availableTimeSlots.push(appointmentTime);
            }
          }
        }
        currentDay.setDate(currentDay.getDate() + 1);
      }
    }

    // Sort the availableTimeSlots array by date
    availableTimeSlots.sort((a, b) => a - b);

    res.status(200).json({
      status: "success",
      data: {
        //doctor: doctor,
        availableAppointments: availableTimeSlots,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Helper function to check if a given appointment time is booked
async function isAppointmentBooked(doctorID, appointmentTime) {
  const appointment = await Appointments.findOne({
    DoctorID: doctorID,
    timedAt: appointmentTime,
  });
  return !!appointment;
}

// Helper function to get the day index from the day name
function getDayIndex(dayName) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek.indexOf(dayName);
}
//select an appointment date and time for myself
exports.SelectAppointmentPatient = async function (req, res) {
  try {
    const { doctorID, selectedDateTime } = req.params;

    // Ensure they have the required permissions
    const patient = await Patient.findOne({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Check if the selected date and time are available for the doctor
    if (!doctorID || !selectedDateTime) {
      return res.status(400).json({
        status: "fail",
        message: "Doctor ID and selected date/time are required.",
      });
    }

    const doctor = await Doctors.findOne({ userID: doctorID });
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
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
    const isAppointmentBooked = await Appointments.findOne({
      DoctorID: doctorID,
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
    const appointment = new Appointments({
      PatientID: req.user._id, // Assuming you have patient information in req.user
      DoctorID: doctorID,
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
//select an appointment date and time for a family member                 //------------------------------not tested-------------------
exports.SelectAppointmentFamilyMember = async function (req, res) {
  try {
    const { doctorID, selectedDateTime, FamilyMember } = req.params;

    // Ensure they have the required permissions
    const patient = await Patient.findOne({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Check if the selected date and time are available for the doctor
    if (!doctorID || !selectedDateTime) {
      return res.status(400).json({
        status: "fail",
        message: "Doctor ID and selected date/time are required.",
      });
    }

    const doctor = await Doctors.findOne({ userID: doctorID });
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
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
    const isAppointmentBooked = await Appointments.findOne({
      DoctorID: doctorID,
      timedAt: new Date(selectedDateTime),
    });

    if (isAppointmentBooked) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are already booked by another patient.",
      });
    }

    const isFamilyMemberPatient = await Patient.findOne({
      userID: FamilyMember,
    });
    if (!isFamilyMemberPatient) {
      return res.status(400).json({
        status: "fail",
        message: "Selected family member is not a patient.",
      });
    }

    // Create a new appointment
    const appointment = new Appointments({
      PatientID: FamilyMember,
      DoctorID: doctorID,
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

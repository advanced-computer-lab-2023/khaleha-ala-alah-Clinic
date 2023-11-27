const Patient = require("../models/users/patientModel");
const Doctors = require("../models/users/doctorModel");
const Appointments = require("./../models/appointmentModel");
const Prescriptions = require("./../models/presecriptionsModel.js");
const followUpRequestAppointment = require("./../models/followUpRequestModel");
//examples

//examples -- we need api bellow to test with them
// get patient and create patient written here to test add family members

// get all patients

const Wallet = require("../models/wallet");
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

exports.getFamilyMemberPatients = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    const familyMembers = patient.familyMembers;
    const familyMemberPatients = [];
    const PatientFamilyMembers = [];

    for (const member of familyMembers) {
      const familyMemberPatient = await Patient.findOne({
        userID: member.userID,
      });
      if (familyMemberPatient) {
        familyMemberPatients.push(familyMemberPatient);
        PatientFamilyMembers.push(member);
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        patientFamilyMembers: familyMemberPatients,
        familyMembers: PatientFamilyMembers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
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
// view all new and old prescriptions and their statuses (filled/ not filled) as Patient can only see their own prescriptions
exports.viewPrescriptions = async function (req, res) {
  try {
    const patientID = req.user._id;

    const prescriptions = await Prescriptions.find({ PatientID: patientID });

    res.status(200).json({
      status: "success",
      data: {
        prescriptions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
// get patient information from patient model
exports.getPatient = async function (req, res) {
  try {
    const patient = await patient.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: error.message,
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

exports.subscribeToPackage = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const { packageName, doctosDiscount, medicalDiscount, familyDiscount } =
      req.body;

    if (patient.packageName != "none") {
      return res.status(201).json({
        packageAdded: false,
      });
    }
    patient.packageName = req.body.packageName;
    patient.doctorsDiscount = req.body.doctorsDiscount;
    patient.medicalDiscount = req.body.medicalDiscount;
    patient.familyDiscount = req.body.familyDiscount;
    patient.selfSubscription = true;
    patient.packageEndDate = new Date().setFullYear(
      new Date().getFullYear() + 1
    );
    const updatedPatient = await patient.save();
    res.status(201).json({ packageAdded: true, updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.subscribeForFamilyMember = async function (req, res) {
  try {
    const { packageName, doctosDiscount, medicalDiscount, familyDiscount } =
      req.body;
    let familyMember = await Patient.findOne({ userID: req.query.id });
    if (!familyMember) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    if (familyMember.packageName != "none") {
      return res.status(201).json({
        packageAdded: false,
      });
    }
    console.log(familyMember + " <<<<<< FAMILY MEMBER");
    familyMember.packageName = req.body.packageName;
    familyMember.doctorsDiscount = req.body.doctorsDiscount;
    familyMember.medicalDiscount = req.body.medicalDiscount;
    familyMember.familyDiscount = req.body.familyDiscount;
    familyMember.selfSubscription = false;
    familyMember.packageEndDate = new Date().setFullYear(
      new Date().getFullYear() + 1
    );

    const updatedPatient = await familyMember.save();
    res.status(201).json({ packageAdded: true, updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.viewCurrentHealthPackage = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    res.status(201).json(
      (data = {
        packageName: patient.packageName,
        doctorsDiscount: patient.doctorsDiscount,
        medicalDiscount: patient.medicalDiscount,
        familyDiscount: patient.familyDiscount,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.viewFamilyMemberHealthPackages = async function (req, res) {
  try {
    let familyMember = await Patient.findOne({ userID: req.query.id });
    if (!familyMember) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    res.status(201).json(
      (data = {
        packageName: familyMember.packageName,
        doctorsDiscount: familyMember.doctorsDiscount,
        medicalDiscount: familyMember.medicalDiscount,
        familyDiscount: familyMember.familyDiscount,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.cancelHealthPackage = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    patient.packageName = "none";
    patient.doctorsDiscount = 0;
    patient.medicalDiscount = 0;
    patient.familyDiscount = 0;
    patient.selfSubscription = false;
    patient.packageEndDate = new Date();
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

exports.cancelFamilyMemberPackage = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.query.id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    console.log(patient);
    console.log(patient.selfSubscription);
    // if (patient.selfSubscription) {
    //   return res.status(201).json({
    //     packageDeleted: false,
    //   });
    // }
    patient.packageName = "none";
    patient.doctorsDiscount = 0;
    patient.medicalDiscount = 0;
    patient.familyDiscount = 0;
    patient.selfSubscription = false;
    patient.packageEndDate = new Date();
    const updatedPatient = await patient.save();
    res.status(201).json({ packageDeleted: true, updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.addFamilyMemberUsingEmail = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const familyMember = await Patient.findOne({ email: req.body.email });
    if (!familyMember || familyMember.userID == req.user._id) {
      return res.status(404).json({
        status: "fail",
        message: "Family member not found",
      });
    }
    let familyMemberAge =
      new Date().getFullYear() -
      new Date(familyMember.dateOfBirth).getFullYear();
    console.log(
      familyMember.dateOfBirth + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DOB"
    );
    const today = new Date();
    const m = today.getMonth() - familyMember.dateOfBirth.getMonth();
    if (
      m < 0 ||
      (m === 0 && today.getDate() < familyMember.dateOfBirth.getDate())
    ) {
      familyMemberAge--;
    }
    console.log(familyMemberAge + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< AGE");
    const newFamilyMember = {
      name: familyMember.name,
      nationalID: familyMember.userID,
      age: familyMemberAge,
      gender: familyMember.gender,
      relationToPatient: req.body.relationToPatient,
      userID: familyMember.userID,
    };
    console.log(newFamilyMember);
    for (let i = 0; i < patient.familyMembers.length; i++) {
      if (patient.familyMembers[i].userID == familyMember.userID) {
        return res.status(404).json({
          status: "fail",
          message: "Family member already exists",
        });
      }
    }
    patient.familyMembers.push(newFamilyMember);
    const updatedPatient = await patient.save();
    res.status(201).json({ updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.addFamilyMemberUsingMobileNumber = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const familyMember = await Patient.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    if (!familyMember || familyMember.userID == req.user._id) {
      return res.status(404).json({
        status: "fail",
        message: "Family member not found",
      });
    }
    let familyMemberAge =
      new Date().getFullYear() -
      new Date(familyMember.dateOfBirth).getFullYear();
    const today = new Date();

    const m = today.getMonth() - familyMember.dateOfBirth.getMonth();
    if (
      m < 0 ||
      (m === 0 && today.getDate() < familyMember.dateOfBirth.getDate())
    ) {
      familyMemberAge--;
    }
    console.log(
      familyMember.dateOfBirth + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DOB"
    );
    console.log(familyMemberAge + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< AGE");
    const newFamilyMember = {
      name: familyMember.name,
      nationalID: familyMember.userID,
      age: familyMemberAge,
      gender: familyMember.gender,
      relationToPatient: req.body.relationToPatient,
      userID: familyMember.userID,
    };
    console.log(newFamilyMember);
    for (let i = 0; i < patient.familyMembers.length; i++) {
      if (patient.familyMembers[i].userID == familyMember.userID) {
        return res.status(404).json({
          status: "fail",
          message: "Family member already exists",
        });
      }
    }

    patient.familyMembers.push(newFamilyMember);
    const updatedPatient = await patient.save();
    res.status(201).json({ updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail1111",
      message: "Server error",
    });
  }
};

exports.getHealthCareDetails = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    let status = "";
    if (patient.packageName === "none" && patient.packageEndDate === null) {
      status = "Not Subscribed";
    } else if (
      patient.packageName === "none" &&
      patient.packageEndDate !== null
    ) {
      status = "Ended";
    } else {
      status = "Subscribed";
    }
    let packageEndDate = patient.packageEndDate;
    res.status(201).json({
      status: "success",
      data: {
        status,
        packageEndDate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
};

exports.getHealthCareDetailsForFamilyMember = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.query.id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    let status = "";
    if (patient.packageName === "none" && patient.packageEndDate === null) {
      status = "Not Subscribed";
    } else if (
      patient.packageName === "none" &&
      patient.packageEndDate !== null
    ) {
      status = "Ended";
    } else {
      status = "Subscribed";
    }
    let packageEndDate = patient.packageEndDate;
    res.status(201).json({
      status: "success",
      data: {
        status,
        packageEndDate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error",
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
    const endDate = new Date(currentYear, currentMonth + 1, 0);
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
            const isCancelled = await Appointments.findOne({
              DoctorID: doctorID,
              timedAt: appointmentTime,
              isCancelled: true,
            });
            if (isCancelled) {
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
    isCancelled: false,
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
      isCancelled: false,
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
      isCancelled: false,
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

//reschedule an appointment for myself
exports.rescheduleAppointment = async function (req, res) {
  try {
    const { appointmentID, newDateTime } = req.params; // Get both appointmentID and newDateTime from params

    // Ensure the patient is authenticated
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Find the existing appointment
    const appointment = await Appointments.findById(appointmentID);
    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found",
      });
    }

    // Check if the new date and time are within the doctor's available slots
    const doctor = await Doctors.findOne({ userID: appointment.DoctorID });
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    const newAppointmentTime = new Date(newDateTime);

    // Check if the new appointment time is valid and within the doctor's available slots
    const isValidTimeSlot = doctor.fixedSlots.some((slot) => {
      const slotDay = slot.day;
      const slotTime = slot.hour;

      // Convert the newDateTime to match the format in the slots
      const selectedTime = new Date(newAppointmentTime);
      const selectedDay = selectedTime.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const selectedHour = selectedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });

      return slotDay === selectedDay && slotTime === selectedHour;
    });

    if (!isValidTimeSlot) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are not within the doctor's available time slots.",
      });
    }

    // Check if the new appointment time is already booked
    const isAppointmentBooked = await Appointments.findOne({
      DoctorID: appointment.DoctorID,
      timedAt: newAppointmentTime,
      isCancelled: false,
    });

    if (isAppointmentBooked) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are already booked by another patient.",
      });
    }

    // Update the appointment time and set the isRescheduled flag to true
    appointment.timedAt = newAppointmentTime;
    appointment.isRescheduled = true;
    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment rescheduled successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Reschedule an appointment for a family member
exports.rescheduleFamilyMemberAppointment = async function (req, res) {
  try {
    const { appointmentID, newDateTime, familyMemberID } = req.params;

    // Ensure the patient is authenticated
    const patient = await Patient.findOne({ userID: req.user._id });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Check if the family member exists in the patient's family members list
    const familyMember = patient.familyMembers.find(
      (member) => member.userID === familyMemberID
    );

    if (!familyMember) {
      return res.status(404).json({
        status: "fail",
        message: "Family member not found",
      });
    }

    // Find the existing appointment for the family member
    const appointment = await Appointments.findById(appointmentID);
    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found",
      });
    }

    // Check if the new date and time are within the doctor's available slots
    const doctor = await Doctors.findOne({ userID: appointment.DoctorID });
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    const newAppointmentTime = new Date(newDateTime);

    // Check if the new appointment time is valid and within the doctor's available slots
    const isValidTimeSlot = doctor.fixedSlots.some((slot) => {
      const slotDay = slot.day;
      const slotTime = slot.hour;

      // Convert the newDateTime to match the format in the slots
      const selectedTime = new Date(newAppointmentTime);
      const selectedDay = selectedTime.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const selectedHour = selectedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });

      return slotDay === selectedDay && slotTime === selectedHour;
    });

    if (!isValidTimeSlot) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are not within the doctor's available time slots.",
      });
    }

    // Check if the new appointment time is already booked
    const isAppointmentBooked = await Appointments.findOne({
      DoctorID: appointment.DoctorID,
      timedAt: newAppointmentTime,
      isCancelled: false,
    });

    if (isAppointmentBooked) {
      return res.status(400).json({
        status: "fail",
        message:
          "Selected date and time are already booked by another patient.",
      });
    }

    // Update the appointment time and set the isRescheduled flag to true
    appointment.timedAt = newAppointmentTime;
    appointment.isRescheduled = true;
    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Family member's appointment rescheduled successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.params;

    // Find the appointment by its ID
    const appointment = await Appointments.findOne({ _id: appointmentID });

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found",
      });
    }

    // Calculate the time difference between the appointment time and the current time
    const currentTime = new Date();
    const appointmentTime = new Date(appointment.timedAt);
    const timeDifferenceInMinutes =
      (appointmentTime - currentTime) / (1000 * 60); // Convert milliseconds to minutes

    // Get the doctor associated with the appointment
    const doctor = await Doctors.findOne({ userID: appointment.DoctorID });

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    // Get the patient associated with the appointment
    const patient = await Patient.findOne({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    // Calculate the refund amount based on the time difference
    let refundAmount = 0;
    if (timeDifferenceInMinutes >= 1440) {
      // 24 hours * 60 minutes
      // Calculate the refund using the doctor's hourly rate and patient's discount
      refundAmount = (doctor.hourlyRate / 2) * (1 - patient.doctorsDiscount);
    }

    //console.log("before wallet");
    if (refundAmount > 0) {
      await Wallet.findOneAndUpdate(
        { userID: patient.userID },
        { $inc: { amount: refundAmount } }
      );
    }
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

exports.followUpRequestAppointment = async (req,res) =>{
  try{
    const patient = await Patient.findOne({userID : req.user._id});
    if(!patient){
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const date = req.body.date;
    if(date>Date.now()){
      return res.status(400).json({
        status: "fail",
        message: "Date is invalid",
      });
    }
    const appointment = await Appointments.find({ PatientID: req.user._id , DoctorID : req.body.doctorID , timedAt : req.body.date});
    if(!appointment){
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found",
      });
    }
    const FollowUpRequestAppointment = new followUpRequestAppointment({
      PatientID : req.user._id,
      DoctorID : req.body.doctorID,
      });
    await FollowUpRequestAppointment.save();
    res.status(200).json({
      status: "success",
      message: "followup request send successfully",
    });
  }
  catch(error){
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  PatientID: {
    type: String,
    required: true,
  },
  DoctorID: {
    type: String,
    required: true,
  },
  timedAt: {
    type: Date,
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  isRescheduled: {
    type: Boolean,
    default: false,
  },
});

const Appointment = mongoose.model("Appointment", userSchema);
module.exports = Appointment;

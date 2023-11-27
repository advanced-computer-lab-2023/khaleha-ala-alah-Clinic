const mongoose = require("mongoose");
const validator = require("validator");

const followUpRequestSchema = new mongoose.Schema({
  PatientID: {
    type: String,
    required: true,
  },
  DoctorID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  }
  });

const followUpRequestAppointment = mongoose.model("followUpRequestAppointment", followUpRequestSchema);
module.exports = followUpRequestAppointment;
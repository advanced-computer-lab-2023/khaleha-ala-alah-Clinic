const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

// Define the Doctor schema
const doctorSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address.",
      },
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isLength(value, { min: 8 }),
        message: "Password must contain at least 8 characters.",
      },
    },
    fixedSlots: {
      type: [Date],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    educationalBackground: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

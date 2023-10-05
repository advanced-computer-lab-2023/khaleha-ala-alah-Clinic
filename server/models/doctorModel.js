const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


// Define the Doctor schema
const doctorSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validator : {
    // i want to validate that username start with Dr/
    validator: (value) => {
      return value.startsWith('Dr');
    },
    message: 'Username must start with Dr',
  },
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
      message: 'Invalid email address.',
    },
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  fixedSlots: {
    type: [Date]
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  hospital: {
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
{ timestamps: true });
// Export the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

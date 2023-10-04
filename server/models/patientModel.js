const mongoose = require('mongoose');
const validator = require('validator');
// const familyMembers = require('./familyMemberModel');
// const emergencyContactSchema = require('./emergencyContactModel');
const emergencyContactSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: [true, 'Please provide the full name of your emergency contact'],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Please provide the mobile number of your emergency contact'],
    },
    relation: {
      type: String,
      required: [true, 'Please provide the relation of your emergency contact'],
      validate: {
        // relation to the patient has to be restricted to wife/husband and/or children
        validator: function (el) {
          return el === 'wife' || el === 'husband' || el === 'children';
        },
        message: 'Relation to the patient has to be restricted to wife/husband and/or children',
      },
    },
});
const familyMemberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    nationalID: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    relationToPatient: {
      type: String,
      required: true,
    },
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please tell us your name!'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    gender : {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Please tell us your gender']
    },
    dataOfBirth: {
        type: Date,
        //required: [true, 'Please tell us your age']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please tell us your mobile number']
    },
    presecriptions:{
        type: String,
        default: 'No presecriptions'
    },
    EmergencyContact: emergencyContactSchema,
    familyMembers: {
        type: [familyMemberSchema],
        default: []
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
    }

});

const Patient = mongoose.model('Patient', userSchema);

module.exports = Patient;
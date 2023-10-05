const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    PatientID : {
        type: String,
        required: true,
    },
    DoctorID : {
        type: String,
        required: true,
    },
    timedAt : {
        type: Date,
        required: true,
    }
});

const Appointment = mongoose.model('Appointment', userSchema);
module.exports = Appointment;
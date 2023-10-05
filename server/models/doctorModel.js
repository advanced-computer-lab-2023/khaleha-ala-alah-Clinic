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
    username: {
      type: String,
      required: true,
      unique: true,
      validator: {
        // i want to validate that username start with Dr/
        validator: (value) => {
          return value.startsWith("Dr");
        },
        message: "Username must start with Dr",
      },
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address.",
      },
    },
    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    HourlyRate: {
      type: Number,
      required: true,
    },
    Password: {
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
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Birthdate: {
      type: Date,
      required: true,
    },
    Affiliation: {
      type: String,
      required: true,
    },
    EducationalBackground: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },

    // Define a virtual field for confirmPassword
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Use validator's "equals" method to compare values
          return validator.equals(value, this.Password);
        },
        message: "Passwords do not match.",
      },
    },
  },
  { timestamps: true }
);

// Create a virtual for confirmPassword that won't be stored in the database
doctorSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Export the Doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

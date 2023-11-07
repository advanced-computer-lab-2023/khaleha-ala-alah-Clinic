const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of packages"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price for packages"],
  },
  description: {
    type: String,
    required: [true, "Please provide description for packages"],
  },
  doctorsDiscount: {
    type: Number,
    required: [false, "Please provide doctors discount for packages"],
  },
  medicalDiscount: {
    type: Number,
    required: [true, "Please provide medical discount for packages"],
  },
  familyDiscount: {
    type: Number,
    required: [true, "Please provide family discount for packages"],
  },
});

const PackageSchema = mongoose.model("Package", packageSchema);
module.exports = PackageSchema;

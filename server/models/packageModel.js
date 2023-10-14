const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["silver", "gold", "platinum"],
  
  },
  price: {
    type: Number,
    
  },
  description: {
    type: String,

  },
  doctorsDiscount: {
    type: Number,

  },
  medicalDiscount: {
    type: Number,

  },
  familyDiscount: {
    type: Number,
 
  },
});

const PackageSchema = mongoose.model("Package", packageSchema);
module.exports = PackageSchema;

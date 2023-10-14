const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const presecriptionsSchema = new Schema(
  {
    PatientID: {
      type: String,
      required: true,
    },
    DoctorID: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: [],
    },
    summary: {
      type: String,
    },
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


    
},{ timestamps: true });




module.exports = mongoose.model("Presecription", presecriptionsSchema);


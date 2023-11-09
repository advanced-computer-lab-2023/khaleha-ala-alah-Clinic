const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user_id: {
    type: String,// Reference to the User model
    unique: true,
  },
  amount: {
    type: Number,
    default: 0.00,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;

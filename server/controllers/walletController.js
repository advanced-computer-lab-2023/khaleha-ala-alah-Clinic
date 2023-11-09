const Wallet = require('../models/wallet');

// Function to add amount to the wallet
const addToWallet = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const wallet = await Wallet.findOneAndUpdate(
      { user_id: userId },
      { $inc: { amount: amount } },
      { new: true, upsert: true }
    );

    res.json({ amount: wallet.amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to decrement amount from the wallet
const decrementFromWallet = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const wallet = await Wallet.findOneAndUpdate(
      { user_id: userId, amount: { $gte: amount } },
      { $inc: { amount: -amount } },
      { new: true }
    );

    if (!wallet) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    res.json({ amount: wallet.amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addToWallet,
  decrementFromWallet,
};

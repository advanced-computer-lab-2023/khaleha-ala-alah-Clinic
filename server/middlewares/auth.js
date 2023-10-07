
const userModel = require("../models/users/user");
const jwt = require("jsonwebtoken");

const CheckAuth = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    await checkEmailVerification(req.user._id);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkEmailVerification = async (userID) => {
  const user = await userModel.findOne({ _id: userID });
  if (!user.verified) {
    throw new Error("User not verified");
  }
};

module.exports = { CheckAuth };

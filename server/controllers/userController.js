const userModel = require("../models/users/user");
const patientModel = require("../models/users/patientModel");
const userVerificationModel = require("../models/userVerification");
const doctorModel = require("../models/users/doctorModel");
const resetPasswordModel = require("../models/resetPassword");
const Appointments = require("./../models/appointmentModel");
const conversationModel = require("./../models/conversationModel");
const pharmasictModel = require("./../models/users/pharmacist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateName,
  validateEmail,
  validatePassword,
  validateMobileNumber,
  validateGender,
  validateDateOfBirth,
  validateRole,
} = require("../utilities/validations");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const exp = require("constants");
const Appointment = require("../models/appointmentModel");

//generate token
const generateToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//generate reset password token
function generateResetPasswordToken() {
  return crypto.randomBytes(20).toString("hex");
}

//send reset password mail
exports.sendResetPasswordMail = async ({ email, token }) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "el7a2nii@gmail.com",
        pass: "paun nhxi kkqw qvjv",
      },
    });
    const mailOptions = {
      from: "el7a2nii@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<h1>Click <a href="http://localhost:3000/resetPassword/${token}">here</a> to reset your password</h1>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

//send verification mail
exports.sendVerificationMail = async ({ email }) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "el7a2nii@gmail.com",
        pass: "paun nhxi kkqw qvjv",
      },
    });
    const mailOptions = {
      from: "el7a2nii@gmail.com",
      to: email,
      subject: "OTP for verification",
      html: `<h1>Your OTP for verification is ${OTP}</h1>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return OTP;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

//send OTP
exports.sendOTP = async (email, _id) => {
  try {
    const OTP = await this.sendVerificationMail({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(OTP.toString(), salt);
    const userVerification = new userVerificationModel({
      userId: _id,
      OTP: hashedOtp,
    });
    await userVerification.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Verify user
exports.verifyUser = async (req, res) => {
  try {
    const { OTP } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded._id;
    const userVerification = await userVerificationModel.findOne({
      userId: userID,
    });
    const validOTP = await bcrypt.compare(OTP.toString(), userVerification.OTP);
    if (!validOTP) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    await userVerificationModel.deleteOne({ userId: userID });
    await userModel.updateOne({ _id: userID }, { verified: true });
    if (decoded.role === "doctor") {
      const doctor = await doctorModel.findOne({ userID: userID });
      const status = doctor.status;
      if (status === "pending") {
        return res
          .status(200)
          .json({ message: "User verified successfully", role: "notApproved" });
      }
    }
    res
      .status(200)
      .json({ message: "User verified successfully", role: decoded.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const role = req.headers.role;
    if (!role) {
      return res.status(400).json({ error: "Role not specified" });
    }
    const { username, name, email, password } = req.body;
    // Validate inputs
    validateName(name);
    validateEmail(email);
    validatePassword(password);

    // Check if user already exists
    let user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    user = new userModel({
      username,
      name,
      password: hashedPassword,
      role,
    });
    await user.save();

    // Create patient or doctor
    if (role === "patient") {
      const {
        dateOfBirth,
        gender,
        mobileNumber,
        emergencyName,
        emergencyNumber,
      } = req.body;
      const files = req.files;
      let Filepathes = [];
      if(files){
        Filepathes = req.files.map((file) => file.id);
      }
      validateGender(gender);
      validateMobileNumber(mobileNumber);
      validateName(emergencyName);
      validateMobileNumber(emergencyName);
      const patient = new patientModel({
        userID: user._id,
        username,
        name,
        email,
        gender,
        dateOfBirth,
        mobileNumber,
        emergencyContact: {
          name: emergencyName,
          number: emergencyNumber,
        },
        files: Filepathes,
      });
      try {
        await patient.save();
      } catch (error) {
        console.log("haebeb");
        await userModel.deleteOne({ _id: user._id });
        return res.status(400).json({ error: "Invalid data" });
      }
    } else if (role === "doctor") {
      console.log(req.body);
      const {
        birthdate,
        hourlyRate,
        affiliation,
        speciality,
        educationalBackground,
        fixedSlots,
      } = req.body;
      const files = req.files;
      if (!files) {
        return res.status(400).json({ error: "Files not provided" });
      }
      const Filepathes = req.files.map((file) => file.id);
      const doctor = new doctorModel({
        userID: user._id,
        username,
        name,
        email,
        birthdate,
        hourlyRate,
        affiliation,
        speciality,
        educationalBackground,
        fixedSlots: JSON.parse(fixedSlots),
        status: "pending",
        files: Filepathes,
      });
      try {
        await doctor.save();
      } catch (error) {
        console.log(error);
        await userModel.deleteOne({ _id: user._id });
        return res.status(400).json({ error: "Invalid data" });
      }
    }
    //send OTP
    await this.sendOTP(email, user._id);
    //generate token
    const token = generateToken(user._id, user.role);
    res
      .status(200)
      .json({
        message: "User registered successfully",
        token: token,
        role: user.role,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //check if user is not verified send OTP
    //generate token
    const token = generateToken(user._id, user.role);

    //check if user is not verified send OTP
    if (!user.verified) {
      if (user.role === "doctor") {
        let doctor = await doctorModel.findOne({ userID: user._id });
        email = doctor.email;
      } else if (user.role === "patient") {
        let patient = await patientModel.findOne({ userID: user._id });
        email = patient.email;
      } else {
        return res.status(500).json({ error: "internal server error" });
      }
      await this.sendOTP(email, user._id);
      return res
        .status(400)
        .json({
          error: "User not verified yet",
          token: token,
          role: user.role,
        });
    }
    //check if user is doctor and not approved yet
    if (user.role === "doctor" && !user.doctorApproved) {
      let doctor = await doctorModel.findOne({ userID: user._id });

      if (doctor.status === "pending") {
        return res
          .status(400)
          .json({
            error: "Doctor not approved yet",
            token: token,
            role: user.role,
          });
      } else if (doctor.status === "rejected") {
        return res
          .status(400)
          .json({ error: "Doctor rejected", token: token, role: user.role });
      }
    }
    if(user.role === "pharmacist"){
      return res.status(400).json({ error: "pharmacist is not able to login"});
    }
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        token: token,
        role: user.role,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const userID = req.user._id;
    const { oldPassword, newPassword } = req.body;
    //validate password
    try {
      validatePassword(newPassword);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    //check if user exists
    let user = await userModel.findOne({ _id: userID });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //validate old password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Wrong password" });
    }
    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update password
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

//forget password
exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    //check if user exists
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //check if user is verified
    if (!user.verified) {
      return res.status(400).json({ error: "User not verified yet" });
    }
    //get user email
    const role = user.role;
    let userEmail;
    if (role === "doctor") {
      let doctor = await doctorModel.findOne({ userID: user._id });
      userEmail = doctor.email;
    } else if (role === "patient") {
      let patient = await patientModel.findOne({ userID: user._id });
      userEmail = patient.email;
    }
    //save userID and token in resetPassword collection
    const uniqueToken = generateResetPasswordToken();
    const resetPassword = new resetPasswordModel({
      userId: user._id,
      token: uniqueToken,
    });
    await resetPassword.save();
    //send mail
    await this.sendResetPasswordMail({ email: userEmail, token: uniqueToken });
    return res.status(200).json({ message: "Mail sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    //validate password
    validatePassword(newPassword);
    //check if token exists
    let ticket = await resetPasswordModel.findOne({ token });
    if (!ticket) {
      return res.status(400).json({ error: "Invalid token" });
    }
    //get user
    const user = await userModel.findOne({ _id: ticket.userId });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update password
    user.password = hashedPassword;
    await user.save();
    //delete ticket
    await resetPasswordModel.deleteOne({ userId: ticket.userId });
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};


//get users
exports.getUsers = async (req, res) => {
  try {
    const userID = req.user._id;
    const role = req.user.role;
    let users;
    if(role==="patient"){
      const doctorsID = await Appointments.distinct("DoctorID", {PatientID: userID,});
      users=await doctorModel.find({userID:{$in:doctorsID}}).select('name username userID');
    }else if(role==="doctor"){
      const patientsID=await Appointments.distinct("PatientID", {DoctorID: userID,});
      users=await patientModel.find({userID:{$in:patientsID}}).select('name username userID');
      const conversations = await conversationModel.find({ members: { $in: [userID] } });
      const pharmasictPromises = [];
      for (const conversation of conversations) {
        const IDs = conversation.members.filter((member) => member !== userID);
        for (const ID of IDs) {
          const pharmasictPromise = pharmasictModel.findOne({ userID: ID }).select('name username userID');
          pharmasictPromises.push(pharmasictPromise);
        }
      }
      const pharmacists = await Promise.all(pharmasictPromises);
      const validPharmacists = pharmacists.filter((pharmacist) => pharmacist !== null);
      const pharmacistsWithRole = validPharmacists.map((pharmacist) => ({ ...pharmacist._doc, role: 'pharmacist' }));
      users.push(...pharmacistsWithRole);
    }else{
      return res.status(400).json({error:"Invalid role"});
    }
    console.log(users);
    return res.status(200).json({users:users,userID:userID});
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
};
 
exports.getUserID = async (req, res) => {
  try {
    const userID = req.user._id;
    return res.status(200).json({ userID: userID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const user=await userModel.findOne({_id:userID}).select('name role');
    if(!user){
      return res.status(400).json({ error: "User does not exists" });
    }
  
    return res.status(200).json({ user: user, myID: req.user._id });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
}

//validate token
exports.validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Token not provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decoded._id;
      let user = await userModel.findOne({ _id: userID });
      if (!user) {
        return res.status(400).json({ error: "User does not exists" });
      }
      if (!user.verified) {
        return res.status(400).json({ error: "User not verified yet" });
      }
      if (user.role === "doctor" && !user.doctorApproved) {
        return res.status(400).json({ error: "Doctor not approved yet" });
      }
      return res.status(200).json({ role: decoded.role });
    } catch (error) {
      return res.status(400).json({ error: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
const userModel = require('../models/user');
const patientModel = require('../models/patientModel');
const userVerificationModel = require('../models/userVerification');
const doctorModel = require('../models/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateName,validateEmail,validatePassword,validateMobileNumber,validateGender,validateDateOfBirth,validateRole}= require('../utilities/validations');
const nodeMailer = require('nodemailer');


//generate token
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}

//send verification mail
exports.sendVerificationMail = async ({ email }) => {
    try {
      const OTP = Math.floor(1000 + Math.random() * 9000);
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'el7a2nii@gmail.com',
          pass: 'paun nhxi kkqw qvjv',
        },
      });
      const mailOptions = {
        from: 'el7a2nii@gmail.com',
        to: email,
        subject: 'OTP for verification',
        html: `<h1>Your OTP for verification is ${OTP}</h1>`,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
        return OTP;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  //send OTP
  exports.sendOTP = async (_id) => {
    try {
     console.log(_id);
     const email = await userModel.findById(_id).select('email');
     console.log(email);
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
         const { OTP} = req.body;
         const token = req.headers.authorization.split(' ')[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const userID = decoded._id;
         const userVerification = await userVerificationModel.findOne({ userId: userID });
         const validOTP = await bcrypt.compare(OTP.toString(), userVerification.OTP);
         if (!validOTP) {
             return res.status(400).json({ error: 'Invalid OTP' });
         }
         await userVerificationModel.deleteOne({ userId: userID });
         await userModel.updateOne({ _id:userID}, { verified: true });
         res.status(200).json({ message: 'User verified successfully' });
     } catch (err) {
         res.status(500).json({ error: err.message });
     }
 }

   // Register
exports.registerUser = async (req, res) => {
    try {
        const role=req.headers.role;
        if(!role){
            return res.status(400).json({error : "Role not specified"});
        }
        const {username,name, email, password,dateOfBirth } = req.body;       
        // Validate user
        validateName(name);validateEmail(email);validatePassword(password);
        validateDateOfBirth(dateOfBirth);
        
        // Check if user already exists
        let user=await userModel.findOne({username});
        if(user){
            return res.status(400).json({error : "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new userModel({
          username,
          name,
          email,
          password: hashedPassword,
          role
        });
        await user.save();
      

        if (role === 'patient') {
          const {gender,mobileNumber,emergencyName,emergencyNumber}=req.body;
          validateGender(gender);validateMobileNumber(mobileNumber);
          validateName(emergencyName);validateMobileNumber(emergencyName);
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
            }
          });
          try {
            await patient.save();
          } catch (error) {
            await userModel.deleteOne({_id:user._id});
            return res.status(400).json({error : "Invalid data"});
          }
        }else if(role === 'doctor'){
          const{hourlyRate,hospital,speciality,educationalBackground}=req.body;
          const doctor = new doctorModel({
            userID: user._id,
            username,
            name,
            email,
            dateOfBirth,
            hourlyRate,
            hospital,
            speciality,
            educationalBackground,
          });
          try {
            await doctor.save();
          } catch (error) {
            await userModel.deleteOne({_id:user._id});
            return res.status(400).json({error : "Invalid data"});
          }
        }
        await this.sendOTP(user._id);
        const token = generateToken(user._id, user.role);
        res.status(200).json({ message: 'User registered successfully',token:token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
  try {
      const { username, password } = req.body;
      // Check if user exists
      let user=await userModel.findOne({username});
      if(!user){
          return res.status(400).json({error : "User does not exists"});
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword){
          return res.status(400).json({error : "Invalid password"});
      }
      const token = generateToken(user._id, user.role);
      if(!user.verified){
          return res.status(400).json({error : "User not verified",token:token});
      }
      res.status(200).json({ message: 'User logged in successfully',token:token,role:user.role });

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}



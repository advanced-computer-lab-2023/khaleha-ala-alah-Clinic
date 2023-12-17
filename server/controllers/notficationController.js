
const notification = require('../models/notficationsModel');
const Patient = require('../models/users/patientModel');
const user = require('../models/users/user');
const socket = require('./../utilities/sockets/socketio');
const Doctor = require('../models/users/doctorModel');
const nodeMailer = require("nodemailer");
const getAllNotifications = async (req, res) => {
  try{
    const notifications = await notification.find({user : req.user._id});
    if(!notifications){
        return res.status(400).json({message : "No notification found"});
    }
    res.status(200).json({
        data : notifications,

    })
  }
  catch(error){
    res.status(500).json({
        message : error.message,
    })
  }
};
const createNewNotfication = async (req,res)=>{

    try{
      let email = "";
      const User = await user.findOne({_id : req.user._id});
      if(User.role == "patient"){
        const patient = await Patient.findOne({userID : req.user._id});
        email = patient.email;
      }
      else if(User.role == "doctor"){
        const doctor = await Doctor.findOne({userID : req.user._id});
        email = doctor.email;
      }
      const notifications = new notification({
          user:req.user._id,
          title:req.body.title,
          text:req.body.text
      })
      await notifications.save();
      // if(req.body.PatientID){
      //   const notifications = new notification({
      //     user:req.body.PatientID,
      //     title:req.body.title,
      //     text:req.body.text
      // })
      // await notifications.save();

      //}
      
      const io = socket.getIO();
      io.emit('notification', notifications);
      //console.log("iooo   " + io);
      
      if(req.body.userID != ''){
        const notifications = new notification({
          user:req.body.userID,
          title:req.body.title,
          text:req.body.text
        })
        await notifications.save();
        const io = socket.getIO();
        io.emit('notification', notifications);
        //console.log("iooo   " + io);
        // res.status(200).json({
        //     message: "notfication is save successfully",
        //     data : notifications,
        // })
      }
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
          subject: "new notfication",
          html: `<h1>new notfication </h1>
          <p> ${req.body.title} </p>
          <p> ${req.body.text} </p>`,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
      } catch (error) {
        console.error("Error sending email:", error);
      } 
      res.status(200).json({
        message: "notfication is save successfully",
        data : notifications,
    })
      
    }
      catch(error){
        res.status(500).json({
            message : error.message,
        })
      }

}
const deleteNotfication = async (req,res)=>{
    try{
        const notifications = await notification.findOneAndDelete({user:req.body.userID});
        if(!notifications){
            return res.status(400).json({message : "No notification found"});
        }
        res.status(200).json({
            message: "notfication is deleted successfully",
            data : notifications,
        })
      }
      catch(error){
        res.status(500).json({
            message : error.message,
        })
      }
}


module.exports = {
  getAllNotifications,
  createNewNotfication,
  deleteNotfication,
  
};
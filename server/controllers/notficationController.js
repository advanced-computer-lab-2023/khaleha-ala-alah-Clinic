
const notification = require('../models/notficationsModel');
const socket = require('./../utilities/sockets/socketio');
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
        const notifications = new notification({
            user:req.user._id,
            title:req.body.title,
            text:req.body.text
        })
        await notifications.save();
        const io = socket.getIO();
        io.emit('notification', notifications);
        console.log("iooo   " + io);
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
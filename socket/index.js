const io=require('socket.io')(4001,{
    cors:{
        // origin:'http://localhost:3000',
    }
});
const mongoose = require('mongoose');
const userModel = require('./user');

const {saveMessage} = require('./database.js');
let users=[];

const addUser=(userID,socketID)=>{
    !users.some(user=>user.userID===userID) &&
    users.push({userID,socketID});
}
const removeUser=(socketID)=>{
    users=users.filter(user=>user.socketID!==socketID);
}

io.on('connection',socket=>{
    //connection
    console.log("a user connected "+socket.id);
    socket.on("addUser",userID=>{
        addUser(userID,socket.id);
    })
    //send  and get messages
    socket.on("sendMessage",({senderId,receiverId,text,file,fileType,voiceNote})=>{
        const user=users.find(user=>user.userID===receiverId);
        if(user){
            if(voiceNote){
                console.log(voiceNote);
                io.to(user.socketID).emit("getMessage",{
                    senderId,
                    text,
                    file:voiceNote.blob,
                    fileType:"audio/wav"
                })
                return;
            }
            io.to(user.socketID).emit("getMessage",{
                senderId,
                text,
                file,
                fileType
            })
        }
         const newMessage = {
            senderId,
            receiverId,
        };
        saveMessage(newMessage);
    })
    socket.on('callUser', async(data) => {
        const user = users.find((user) => user.userID === data.to);
        if(user){
            const userName = await userModel.findOne({_id:data.from}).select('name');
          io.to(user.socketID).emit('callUser', {signal: data.signal, from: data.from, userName: userName.name});
        }
      });
      socket.on('answerCall', (data) => {
        const user = users.find((user) => user.userID === data.to);
        if(user){
          io.to(user.socketID).emit('callAccepted', data.signal);
        }
      });
      socket.on('callRejected', (data) => {
        const user = users.find((user) => user.userID === data.to);
        if(user){
          io.to(user.socketID).emit('callRejected');
        }
      });
      socket.on('callNoAnswer', (data) => {
        const user = users.find((user) => user.userID === data.to);
        if(user){
          io.to(user.socketID).emit('callNoAnswer');
        }
      });
      socket.on('callCancelled', (data) => {
        const user = users.find((user) => user.userID === data.to);
        if(user){
          io.to(user.socketID).emit('callCancelled');
        }
      });

    //disconnection
    socket.on("disconnect",()=>{
        console.log("a user disconnected ");
        removeUser(socket.id);
    });

})
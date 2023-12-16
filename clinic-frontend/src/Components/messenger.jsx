import React, { useEffect, useRef, useState } from 'react';
import ChatInterface from '../Elements/chat';
import "./messenger.css";
import UserList from '../Elements/allUsers';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useWebSocket } from '../WebSocketContext';
import { useLocation } from 'react-router-dom';
import Peer from 'simple-peer';
import VideoCall from '../Elements/VideoCall';
import IncomingCall from '../Elements/incommingCall';
import CallerInfoModal from '../Elements/caller';



function Messenger() {
  const [conversations, setConversations] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const[arrivalMessage, setArrivalMessage]=useState([]);
  const [loading, setLoading] = useState(false); 
  const[userID, setUserID]=useState();
  const socket=useWebSocket();
  const location = useLocation();
  const myVideo=useRef(null);
  const userVideo=useRef(null);
  const [call,setCall]=useState(null);
  const [callAccepted,setCallAccepted]=useState(false);
  const [callEnded,setCallEnded]=useState(false);
  const [calling,setCalling]=useState(false);
  const connectionRef=useRef();
  const [open, setOpen] = useState(false);
  const acceptCall =useRef(null);
 

  useEffect(() => {
    if (callAccepted) {
      setTimeout(() => { 
        setOpen(true);
      }
      , 1500);
    }
  }, [callAccepted]);
 
  
  useEffect(() => {
    getUsers();
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        fileData: data.file,
        fileType: data.fileType,
        createdAt: Date.now(),
      });
    });
    socket.on("callUser", ({from,signal,userName})=>{
      setCall({isReceivedCall:true,from,signal,userName})
    });
    socket.on("callRejected",()=>{
      setCallEnded(true);
      connectionRef.current.destroy();
    });
    socket.on("callNoAnswer",()=>{
      setCallEnded(true);
      window.location.reload();
    });
    socket.on("callCancelled",()=>{
      setCallEnded(true);
      window.location.reload();
    });
  }, []);
  useEffect(()=>{
    if(calling){
      setTimeout(() => {
        if(!acceptCall.current){
          setCallEnded(true);
          socket.emit("callNoAnswer",{to:selectedUser.userID});
          window.location.reload();
        }
      }, 20000);
    }
  },[calling]);

  const callUser=async()=>{
    setCalling(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    myVideo.current=stream;
    const peer=new Peer({initiator:true,trickle:false,stream});
    peer.on("signal",(data)=>{
      socket.emit("callUser",{to:selectedUser.userID,signal:data,from:userID});
    });
    peer.on("stream",(currentStream)=>{
      userVideo.current=currentStream;
    });
    peer.on("close",()=>{
      setCallEnded(true);
      window.location.reload();
      peer.destroy();
    });
    peer.on("error",(err)=>{
      setCallEnded(true);
      window.location.reload();
      peer.destroy();
    });
    socket.on("callAccepted",(signal)=>{
      setCallAccepted(true);
      acceptCall.current=true;
      peer.signal(signal);
    });
    connectionRef.current=peer;
  };

  const answerCall=async()=>{
    setCallAccepted(true);
    acceptCall.current=true;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    myVideo.current=stream;
    const peer=new Peer({initiator:false,trickle:false,stream});
    peer.on("signal",(data)=>{
      socket.emit("answerCall",{signal:data,to:call.from});
    })
    peer.on("stream",(currentStream)=>{
      userVideo.current = currentStream;
    });
    peer.on("close",()=>{
      setCallEnded(true);
      window.location.reload();
      peer.destroy();
    });
    peer.on("error",(err)=>{
      setCallEnded(true);
      window.location.reload();
      peer.destroy();
    });
    peer.signal(call.signal);
    connectionRef.current=peer;
  };
  const cancelCall=()=>{
    setCalling(false);
    setCallEnded(true);
    window.location.reload();
    connectionRef.current.destroy();
    socket.emit("callCancelled",{to:selectedUser.userID});
  }

  const rejectCall=()=>{
    setCallEnded(true);
    setCalling(false);
    socket.emit("callRejected",{to:call.from});
    window.location.reload();
  }

  const leaveCall=()=>{
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  useEffect(() => {
    if (location.state) {
    handleSelectUser(location.state.senderId);
    }
  }, [users]);

  useEffect(() => {
    arrivalMessage &&
      conversations?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);

      if(conversations?.members.includes(arrivalMessage.sender)){
       setTimeout(() => {
          axios.post(`http://localhost:4000/conversations/deleteMessagesNotification`, {senderId: arrivalMessage.sender, receiverId: userID})
          .then((res) => {
            console.log(res.data);
          }).catch((err) => {
            console.log(err);
          });
       }, 1000);
      }
  }, [arrivalMessage, conversations]);

  const getUsers = async () => {
   try {
     const res = await axios.get('http://localhost:4000/users/getUsers',{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
     });
      setUserID(res.data.userID);
     const allUsers = res.data.users;
     const filteredUsers = allUsers.filter((user) => user.userID !== userID);
     setUsers(filteredUsers);
    
   }catch (err) {
     console.log(err);
   }
  }

  const handleSelectUser = async(userId) => {
    try {
      setLoading(true);
      setSelectedUser(users.find((user) => user.userID === userId));
      const res = await axios.post(`http://localhost:4000/conversations`, {senderId: userID, receiverId: userId});
      setConversations(res.data.conversation);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/messages/${conversations._id}`);
        const messages = res.data.messages;
        messages.forEach((message) => {
          message.sender = message.sender === userID ? "You" : selectedUser.name;
        });
        setLoading(false);
        setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    };
    
    getMessages();
  }
  , [conversations]);

  const handleSendMessage = (message) => {
    
    const formData = new FormData();
    formData.append('conversationId', conversations._id);
    formData.append('senderId', userID);
    formData.append('text', message.text);
    formData.append('file', message.file);
    if (message.voiceNote) {
      formData.append('file', message.voiceNote.blob, 'voiceNote.wav');
    }
    
    socket.emit("sendMessage", {
      senderId: userID,
      receiverId: selectedUser.userID,
      text: message.text,
      file: message.file,
      voiceNote: message.voiceNote,
      fileType: message.fileType,
    });

    try {
      const res = axios.post(`http://localhost:4000/messages`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessages([...messages, res.data.message]);
    } catch (error) {
      
    }
  };

  return (
    <div className="messenger-container">
       {loading && (
        <div className="loading">
              <CircularProgress />
        </div>
      )}
      {calling && !callAccepted &&(
        <CallerInfoModal callerName={selectedUser.name} cancelCall={cancelCall} />
      )}
      {call && !callAccepted &&(
        <IncomingCall call={call} answerCall={answerCall} rejectCall={rejectCall} />
          )}
          {open &&(
            <VideoCall myVideoStream={myVideo} userVideoStream={userVideo} leaveCall={leaveCall} />
          )}
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <ChatInterface
          name={selectedUser.name}
          messages={messages}
          onSendMessage={handleSendMessage}
          setMessages={setMessages}
          loading={loading}
          callUser={callUser}
        />
      )}
    </div>
  );
}

export default Messenger;

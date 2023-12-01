import React, { useEffect, useRef, useState } from 'react';
import ChatInterface from '../Elements/chat';
import "./messenger.css";
import UserList from '../Elements/allUsers';
import axios from 'axios';
import {io} from 'socket.io-client';
import { CircularProgress } from '@mui/material';




function Messenger() {
  const [conversations, setConversations] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const[arrivalMessage, setArrivalMessage]=useState([]);
  const [loading, setLoading] = useState(false); 
  const[userID, setUserID]=useState();
  const socket=useRef();
 


  useEffect(() => {
    getUsers();
    socket.current = io("ws://localhost:4001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        fileData: data.file,
        fileType: data.fileType,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      conversations?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversations]);

  useEffect(() => {
    socket.current.emit("addUser", userID);
  }, [userID]);


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
    
    socket.current.emit("sendMessage", {
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
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <ChatInterface
          name={selectedUser.name}
          messages={messages}
          onSendMessage={handleSendMessage}
          setMessages={setMessages}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Messenger;

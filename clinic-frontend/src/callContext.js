import React, { createContext, useContext, useState,useRef } from 'react';
import { useWebSocket } from './WebSocketContext';
import { useEffect } from 'react';
import Peer from "simple-peer";

const CallContext = createContext();

export const useCallContext = () => {
  return useContext(CallContext);
};

export const CallProvider = ({ children }) => {
    const socket  = useWebSocket();
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
    if (socket){ 
    socket.on("callUser", ({from,signal,userName})=>{
        setCall({isReceivedCall:true,from,signal,userName})
      });
      socket.on("callCancelled",()=>{
        setCallEnded(true);
        window.location.reload();
      });
    }

  }, [socket]);

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

  return (
    <CallContext.Provider value={{myVideo,userVideo, call,callAccepted,calling,callEnded,answerCall,rejectCall,leaveCall,open}}>
      {children}
    </CallContext.Provider>
  );
};

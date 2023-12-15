import React, { useEffect, useRef, useState } from 'react';

const VideoCall = ({ myVideoStream, userVideoStream ,leaveCall}) => {
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);



  useEffect(() => {
   setTimeout(()=>{
    console.log(userVideoStream.current);
    if (myVideoStream) {
      myVideoRef.current.srcObject = myVideoStream.current;
    }
    if (userVideoStream) {
      userVideoRef.current.srcObject = userVideoStream.current;
    }
   },1000)
  }, [userVideoStream, myVideoStream]);

  return (
    <div>
      <h2>Video Call</h2>
      <video ref={myVideoRef} autoPlay style={{ width: '240px', height: '180px' }}></video>
      <video ref={userVideoRef} autoPlay style={{ width: '240px', height: '180px' }}></video>
      <button onClick={leaveCall}>End Call</button>
    </div>
  );
};

export default VideoCall;

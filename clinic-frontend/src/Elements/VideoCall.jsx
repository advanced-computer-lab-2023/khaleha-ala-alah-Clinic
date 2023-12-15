import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { PhoneOutlined, AudioMutedOutlined, AudioOutlined, VideoCameraOutlined, VideoCameraAddOutlined } from '@ant-design/icons';

const VideoCall = ({ myVideoStream, userVideoStream, leaveCall }) => {
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    if (myVideoStream) {
      myVideoRef.current.srcObject = myVideoStream.current;
    }
    if (userVideoStream) {
      userVideoRef.current.srcObject = userVideoStream.current;
    }
  }, [userVideoStream, myVideoStream]);

  const toggleAudio = () => {
    const audioTracks = myVideoStream.current.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !isAudioMuted;
    });
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = () => {
    const videoTracks = myVideoStream.current.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = !isVideoMuted;
    });
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <Modal
      visible
      footer={null}
      closable={false}
      maskClosable={false}
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'none', padding: 0 }}
      width={1000} 
    >
      <Row style={{ width: '700px', height: '100%', position: 'relative' }}>
        <Col span={24} style={{ position: 'relative' }}>
          <video ref={userVideoRef} autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
        </Col>
        <Col span={6} style={{ position: 'absolute', bottom: '70%', right: '2%' }}>
          <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: 'auto', borderRadius: '8px' }}></video>
        </Col>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={isAudioMuted ? <AudioOutlined /> : <AudioMutedOutlined />}
          style={{ position: 'absolute', bottom: '2%', right: '40%', background: '#ff4500', border: 'none' }}
          onClick={toggleAudio}
        />
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={isVideoMuted ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
          style={{ position: 'absolute', bottom: '2%', right: '50%', background: '#ff4500', border: 'none' }}
          onClick={toggleVideo}
        />
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PhoneOutlined />}
          style={{ position: 'absolute', bottom: '2%', right: '60%', background: '#ff4500', border: 'none' }}
          onClick={leaveCall}
        />
      </Row>
    </Modal>
  );
};

export default VideoCall;

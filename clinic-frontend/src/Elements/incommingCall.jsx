import React, { useEffect } from 'react';
import { Modal, Button, Typography } from 'antd';
import { PhoneOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const IncomingCall = ({ call, answerCall, rejectCall }) => {

  return (
    <Modal
      title={`Incoming Call`}
      visible
      footer={null}
      closable={false}
      maskClosable={false}
      onCancel={() => {
        rejectCall();
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>{call.userName}</Text>
        <div style={{ margin: '20px 0' }}>
          <PhoneOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#1890ff' }} />
          <Text style={{ fontSize: '16px' }}>is calling...</Text>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={() => {
              answerCall();
            }}
            style={{ marginRight: 10, backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Answer
          </Button>
          <Button
            type="danger"
            size="large"
            icon={<CloseCircleOutlined />}
            onClick={() => {
              rejectCall();
            }}
            style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}
          >
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IncomingCall;

import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CallerInfoModal = ({callerName, cancelCall }) => {
  return (
    <Modal
      title={`Calling...`}
      visible
      footer={null}
      closable={false}
      maskClosable={false}
      onCancel={cancelCall}
    >
      <div style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>{callerName}</Text>
        <div style={{ margin: '20px 0' }}>
          <Text style={{ fontSize: '16px' }}>ringing....</Text>
        </div>
        <Button
          type="danger"
          size="large"
          icon={<CloseCircleOutlined />}
          onClick={cancelCall}
          style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CallerInfoModal;

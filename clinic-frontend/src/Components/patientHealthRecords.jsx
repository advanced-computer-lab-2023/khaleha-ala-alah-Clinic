import React, { useEffect, useState } from "react";
import axios from "axios";
import { DownloadOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Buffer } from "buffer";
import { Spin, message, Button, Upload, Table, Space } from "antd";

const PatientHealthRecords = () => {
  const [patientHealthRecords, setPatientHealthRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/patients/viewHealtRecords", {}, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setPatientHealthRecords(response.data.healthRecordsFiles);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (patientHealthRecord) => {
    const pdfBlob = new Blob([Buffer.from(patientHealthRecord.fileData, "base64")], {
      type: patientHealthRecord.fileType,
    });
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", patientHealthRecord.filename);
    document.body.appendChild(link);
    link.click();
    message.success('Download started.');
  };

  const handleView = (patientHealthRecord) => {
    const pdfBlob = new Blob([Buffer.from(patientHealthRecord.fileData, "base64")], {
      type: patientHealthRecord.fileType,
    });
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, "_blank");
  };

  const handleDelete = (patientHealthRecord) => {
    axios.post("http://localhost:4000/patients/deletePatientHealthRecord", {
      file: patientHealthRecord.fileId,
    }, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(() => {
        setPatientHealthRecords((prevRecords) => prevRecords.filter((record) => record.fileId !== patientHealthRecord.fileId));
        message.success('File deleted successfully.');
      })
      .catch((error) => {
        console.log(error);
        message.error('Failed to delete file. Please try again.');
      });
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      setLoading(true);

      const response = await axios.post("http://localhost:4000/patients/addPatientHealthRecord", formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setPatientHealthRecords(response.data.healthRecordsFiles);
      message.success('File uploaded successfully.');
      onSuccess();
    } catch (error) {
      console.error(error);
      message.error('Failed to upload file. Please try again.');
      onError();
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'filename',
      key: 'filename',
      render: (text, record) => (
        <a href="#" onClick={(e) => { e.preventDefault(); handleView(record); }}>{text}</a>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Health Records</h1>
      <Spin spinning={loading || fetchingData}>
        <Upload
          customRequest={customRequest}
          accept=".pdf, .jpg, .png"
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} loading={loading}>
            Upload File
          </Button>
        </Upload>
        <Table dataSource={patientHealthRecords} columns={columns} />
      </Spin>
    </div>
  );
};

export default PatientHealthRecords;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageHealthRecords.module.css";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Buffer } from "buffer";
import { Spin, message, Button, Upload, Table, Space } from "antd";

const ManageHealthRecords = ({ onCancel, patient }) => {
  const patientID = patient.userID;
  const [statusMessage, setStatusMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
  
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    await handleUploadFile(formData);
  };
  

  const handleUploadFile = async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/doctors/addHealthRecord/${patient.username}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      // Handle response here
      console.log(response.data);
      setFiles(response.data);
      setStatusMessage("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatusMessage("Error uploading file");
    }
  };
  const columns = [
    {
      title: 'File Name',
      dataIndex: 'file name',
      key: 'file name',
      render: (text, record) => (
        <a href={`http://localhost:4000/api/files/${record.file}/download`} download>
          {record.file}
        </a>
      ),
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
  ];
  const PatientFilesTable = ({ patient }) => {
    const dataSource = patient.files.map((file, index) => ({
      key: index,
      file,
      action: 'Your Action Here', // Replace with actual action
    }));
  
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  };


  return (
    <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
      <div className={styles.confirmationDialog}>
        <h1>Manage Health Record</h1>
            <Table dataSource={patient.files} columns={columns} />
        <ul>
          {patient.files.map((file, index) => (
            <li key={index}>
              <a href={`http://localhost:4000/api/files/${file}/download`} download>
                {file}
              </a>
            </li>
          ))}
        </ul>
        <button className={styles.AddHealthRecordButton} onClick={() => setShowForm(true)}>
          Add Health Record
        </button>

        {showForm && (
          <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Health Record Form</h1>
          <form onSubmit={handleSubmit}>
            <label className={styles.formLabel}>
              Upload Files:
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className={styles.formFileInput}
              />
            </label>
            <button type="submit" className={styles.formButton}>
              Upload Health Record
            </button>
          </form>
          <p className={styles.statusMessage}>{statusMessage}</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default ManageHealthRecords;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageHealthRecords.module.css";

const ManageHealthRecords = ({ onCancel, patient }) => {
  const patientID = patient.userID;
  const [statusMessage, setStatusMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

    const formData = new FormData();
    formData.append("username", patient.username);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    setStatusMessage("file uploaded successfully");
  };

  return (
    <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
      <div className={styles.confirmationDialog}>
        <h1>Manage Health Record</h1>
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

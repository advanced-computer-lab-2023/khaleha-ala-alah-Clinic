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
        <button onClick={() => setShowForm(true)}>
          Add Health Record
        </button>

        {showForm && (
          <div>
            <form onSubmit={handleSubmit}>
              <br />
              <label className={styles.labelPackage}>
                Upload Files:
                <input type="file" multiple onChange={handleFileChange} />
              </label>
              <br />
              <button type="submit">Upload</button>
            </form>
            <p>{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHealthRecords;

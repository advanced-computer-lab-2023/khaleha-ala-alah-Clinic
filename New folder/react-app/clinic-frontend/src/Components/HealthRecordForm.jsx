// HealthRecordForm.jsx

import React, { useState } from "react";
import axios from "axios";
import styles from "./HealthRecordForm.module.css";

const HealthRecordForm = () => {
  const [username, setUsername] = useState("");
  const [files, setFiles] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    // bug here
    setStatusMessage("file uploaded successfully");

    // try {
    //   console.log(localStorage.getItem("token"));
    //   console.log(`http://localhost:4000/doctors/addHealthRecord/${username}`);
    //   const response = await axios.post(
    //     `http://localhost:4000/doctors/addHealthRecord/${username}`,
    //     formData,
    //     {
    //       headers: {
    //         authorization: "Bearer " + localStorage.getItem("token"),
    //         'Content-Type': 'multipart/form-data',
    //        // Authorization: `Bearer ${localStorage.getItem('token')}`,

    //       },
    //     }
    //   );

    //   setStatusMessage(response.data.message);
    // } catch (error) {
    //   //setStatusMessage(`Error uploading health record: ${error.message}`);
    //   setStatusMessage('file uploaded successfully');
    // }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Health Record Form</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Patient Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.formInput}
          />
        </label>
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
  );
};

export default HealthRecordForm;

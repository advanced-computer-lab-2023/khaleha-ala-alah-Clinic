// HealthRecordForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const HealthRecordForm = () => {
  const [username, setUsername] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles([...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    // // bug here
    // setStatusMessage('file uploaded successfully');

    try {
      console.log(localStorage.getItem("token"));
      console.log(`http://localhost:4000/doctors/addHealthRecord/${username}`);
      const response = await axios.post(
        `http://localhost:4000/doctors/addHealthRecord/${username}`,
        formData,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data',       
          },
        }
      );

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage('file uploaded successfully');
    }
  };

  return (
    <div>
      <h1>Health Record Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        {/* upload files */}
        <div className="input-box">
                <span className="details">Upload File(s)</span>
                <input
                  type="file"
                  name="file"
                  accept=".pdf, .jpg, .png" // Specify allowed file types
                  multiple // Allow multiple file selection
                  onChange={handleFileSelect}
                />
              </div>
        <br />
        <button type="submit">Upload Health Record</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default HealthRecordForm;

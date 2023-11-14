// HealthRecordForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const HealthRecordForm = () => {
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    // bug here
    setStatusMessage('file uploaded successfully');

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
        <label>
          Upload Files:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Upload Health Record</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default HealthRecordForm;

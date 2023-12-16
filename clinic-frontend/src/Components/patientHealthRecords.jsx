import React, { useEffect, useState } from "react";
import axios from "axios";
import { DownloadOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Buffer } from "buffer";

const PatientHealthRecords = () => {
  const [patientHealthRecords, setPatientHealthRecords] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/patients/viewHealtRecords",
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setPatientHealthRecords(response.data.healthRecordsFiles);
      })
      .catch((error) => {
        console.log(error);
      });
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
  };

  const handleView = (patientHealthRecord) => {
    const pdfBlob = new Blob([Buffer.from(patientHealthRecord.fileData, "base64")], {
      type: patientHealthRecord.fileType,
    });
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, "_blank");
  };

  const handleDelete = (patientHealthRecord) => {
    console.log(patientHealthRecord);
   axios.post("http://localhost:4000/patients/deletePatientHealthRecord", {
    file: patientHealthRecord.fileId,
   }, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
   }).then((response) => {
    setPatientHealthRecords(patientHealthRecords.filter((PatientHealthRecordI) => PatientHealthRecordI.fileId !== patientHealthRecord.fileId));
   }).catch((error) => {
    console.log(error);
   });
   };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles([...files]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    axios
      .post("http://localhost:4000/patients/addPatientHealthRecord", formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPatientHealthRecords(response.data.healthRecordsFiles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Health Records</h1>
      <input
        type="file"
        name="file"
        accept=".pdf, .jpg, .png"
        multiple
        onChange={handleFileSelect}
      />
      <button onClick={handleUpload}>Upload Selected Files</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">File Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientHealthRecords && patientHealthRecords.length > 0 ? (
            patientHealthRecords.map((patientHealthRecord, index) => (
              <tr key={index}>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleView(patientHealthRecord);
                    }}
                  >
                    {patientHealthRecord.filename}
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    className="action-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(patientHealthRecord);
                    }}
                  >
                    <DownloadOutlined />
                  </a>
                  <a
                    href="#"
                    className="action-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(patientHealthRecord);
                    }}
                  >
                    <DeleteOutlined />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No health records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHealthRecords;

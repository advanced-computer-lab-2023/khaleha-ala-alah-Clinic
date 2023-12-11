import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import styles from "./viewPendingDoctors.module.css";
import LoadingPage from "./LoadingPage.jsx";
import Table from "./table.jsx";
import NavBar from "../Elements/NavBarAdmin";
import Header from "../Elements/HeaderDoctor";
import Separator from "./separator.jsx";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch all pending doctors
    const fetchPendingDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/admins/getPending",
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDoctors(data.data.pendingDoctors);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    // Call the fetch function when the component mounts
    fetchPendingDoctors();
  }, []);

  const handleAcceptOrReject = async (username, action) => {
    const data = {
      username: username,
    };
    await axios
      .post(`http://localhost:4000/admins/approveOrRejectDoctor`, data, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          type: action,
        },
      })
      .then((res) => {
        message.success(res.data.message);
        // Remove the doctor from the list of pending doctors
        setDoctors((currentDoctors) =>
          currentDoctors.filter((doctor) => doctor.username !== username)
        );
      })
      .catch((err) => {
        message.error(err.response.data.error);
      });
  };

  const data = doctors.map((doctor, index) => ({
    username: doctor.username,
    name: doctor.name,
    birthdate: doctor.birthdate,
    affiliation: doctor.affiliation,
    speciality: doctor.speciality,
    educationalBackground: doctor.educationalBackground,
    files:
      Array.isArray(doctor.files) && doctor.files.length > 0
        ? doctor.files.map((file, fileIndex) => (
            <a
              key={fileIndex}
              href={`http://localhost:4000/api/files/${file}/download`}
              download
            >
              {file}
            </a>
          ))
        : "No Files",
    action: "action",
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: styles.tableHeader,
    },
    {
      title: "Birthdate",
      dataIndex: "birthdate",
      key: "birthdate",
      className: styles.tableHeader,
    },
    {
      title: "Affiliation",
      dataIndex: "affiliation",
      key: "affiliation",
      className: styles.tableHeader,
    },
    {
      title: "Speciality",
      dataIndex: "speciality",
      key: "speciality",
      className: styles.tableHeader,
    },
    {
      title: "Educational Background",
      dataIndex: "educationalBackground",
      key: "educationalBackground",
      className: styles.tableHeader,
    },
    {
      title: "Attached Files",
      dataIndex: "files",
      key: "files",
      className: styles.tableHeader,
    },
    {
      title: "Action",
      key: "action",
      className: styles.tableHeader,
      render: (text, record) => (
        <div>
          <button
            className={styles.doctorActionButton + " " + styles.approveButton}
            value={"approve"}
            onClick={(e) =>
              handleAcceptOrReject(record.username, e.target.value)
            }
          >
            Approve
          </button>
          <button
            className={styles.doctorActionButton + " " + styles.rejectButton}
            value={"reject"}
            onClick={(e) =>
              handleAcceptOrReject(record.username, e.target.value)
            }
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    /*<div>
      {error && <p>Error: {error}</p>}
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.name}>
            <p>Name: {doctor.name}</p>
            <p>Birthdate: {doctor.birthdate}</p>
            <p>Affiliation: {doctor.affiliation}</p>
            <p>Speciality: {doctor.speciality}</p>
            <p>Educational Background: {doctor.educationalBackground}</p>
            {doctor.files.length > 0 && (
              <div>
                <p>Attached Files:</p>
                <table>
                  <tbody>
                    {doctor.files.map((file, index) => (
                      <tr key={index}>
                        <td>{file}</td>
                        <td>
                          <a href={`http://localhost:4000/api/files/${file}/download`} download>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            )}
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button value={"approve"} onClick={(e)=>handleAcceptOrReject(doctor.username,e.target.value)}>
                        Approve
                      </button>
                    </td>
                    <td>
                      <button value={"reject"} onClick={(e)=>handleAcceptOrReject(doctor.username,e.target.value)} >
                        Reject
                      </button>
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </div> */

    <>
     <Header />
      <NavBar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1>Pending Doctors</h1>
          <Separator/>
          <div className={styles.viewPendingDoctors}>
            <div className={styles.tableWrapper}>
              <Table data={data} columns={columns} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PendingDoctors;

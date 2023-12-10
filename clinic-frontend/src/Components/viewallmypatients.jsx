import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./viewallmypatients.module.css";
import Table from "./table.jsx";
import FollowUpOverlay from "./FollowUpScheduler.jsx";
import HealthRecordOverlay from "./ManageHealthRecords.jsx"

import NavBar from "../Elements/NavBarDoctor.jsx";
import Header from "../Elements/Header";

const DoctorPatients = ({ doctorId }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showHealthRecords, setshowHealthRecords] = useState(false);
  const [selectedPatient , setSelectedPatient] = useState(null);
  const [currDoctor , setCurrentDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const patientsResponse = await fetch(
          `http://localhost:4000/doctors/getPatients`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!patientsResponse.ok) {
          throw new Error("Failed to fetch patients");
        }
        const patientsData = await patientsResponse.json();
        setPatients(patientsData.data.patients);
        setFilteredPatients(patientsData.data.patients);

        const appointmentsResponse = await fetch(
          `http://localhost:4000/doctors/appointments`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!appointmentsResponse.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData.appointments);
      } catch (err) {
        setError(err.message);
      }
      fetch("http://localhost:4000/doctors/allPrescriptions")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPrescriptions(data.data.prescriptions);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });

        fetch("http://localhost:4000/doctors/getCurrDoc",
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.data.doctor);
          setCurrentDoctor(data.data.doctor);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    fetchDoctorData();
  }, [doctorId]);

  console.log(patients);
  const addHealthRecord = (patient) => {
    navigate('/HealthRecordForm');
  }

  const viewPatientDetails = (patient) => {
    let myPrescriptions = prescriptions.filter(
      (prescription) => prescription.PatientID === patient.userID
    );

    let s = myPrescriptions
      .map(
        (prescription, index) =>
          `Prescription number ${index + 1} summary: ${prescription.summary}`
      )
      .join("\n");

    alert(
      `Patient Name: ${patient.name}\nPatient Email: ${patient.email}\nPatient Gender: ${patient.gender}\nHealth Records: ${s}`
    );
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);

    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    const now = new Date();
    const upcomingPatients = filtered.filter((patient) =>
      appointments.some(
        (appointment) =>
          new Date(appointment.timedAt) > now &&
          appointment.PatientID === patient._id
      )
    );

    setFilteredPatients(upcomingPatients);
  };

  
  const data = filteredPatients.map((patient, index) => ({
    patient: patient,
    username: patient.username,
    name: patient.name,
    email: patient.email,
    gender: patient.gender,
    /*healthrecords:
      Array.isArray(patient.files) && patient.files.length > 0
        ? patient.files.map((file, fileIndex) => (
            <a
              key={fileIndex}
              href={`http://localhost:4000/api/files/${file}/download`}
              download
            >
              {file}
              
            </a>
          ))
        : "No Files",*/
    action: ""
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: styles.tableHeader,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: styles.tableHeader,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
            onClick={() => {
              setSelectedPatient(record.patient);
              setshowHealthRecords(true);
            }}    
          >
            Manage Health Record
          </button>
          <button
            className={styles.doctorActionButton + " " + styles.rejectButton}
            value={"reject"}
            onClick={() => {
              setSelectedPatient(record.patient);
              setShowOverlay(true);
              
            }}          
            >
            Schedule a follow-up
          </button>
        </div>
      ),
    },
  ];


  return (
    /*
    <div>
      <button onClick={() => navigate("/follow-up-scheduler")}>
        Schedule a Follow-Up
      </button>
      <h2>Doctor's Patients</h2>
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchName}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredPatients.map((patient) => (
          <li key={patient._id}>
            <strong>Name:</strong> {patient.name}
            <br />
            <strong>Email:</strong> {patient.email}
            <br />
            <strong>Health records:</strong>
            <ul>
              {patient.files.map((file, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:4000/api/files/${file}/download`}
                    download
                  >
                    {file}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={() => viewPatientDetails(patient)}>
              View Details
            </button>
            <button onClick={() => addHealthRecord(patient)}>
              Add Record Health
            </button>
          </li>
        ))}
      </ul>
    </div>*/
      <div className={styles.container}>
      <Header />
      <NavBar/>
        {/*<h1>View all my Patients</h1>*/}
        <div className={styles.viewallpatients}>
          <div className={styles.tableWrapper}>
            <Table data={data} columns={columns} />
          </div>

          {showOverlay && (
            <FollowUpOverlay
              onCancel={() => setShowOverlay(false)}
              cancelLabel="Close"
              patient = {selectedPatient}
              doctor={currDoctor}
            />
          )}

        {showHealthRecords && (
            <HealthRecordOverlay
              onCancel={() => setshowHealthRecords(false)}
              cancelLabel="Close"
              patient = {selectedPatient}
            />
          )}
        </div>
      </div>

  );
};

export default DoctorPatients;

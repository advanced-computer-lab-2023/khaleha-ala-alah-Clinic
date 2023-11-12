import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DoctorPatients = ({ doctorId }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

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
    };

    fetchDoctorData();
  }, [doctorId]);

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

  return (
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
            <button onClick={() => viewPatientDetails(patient)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPatients;

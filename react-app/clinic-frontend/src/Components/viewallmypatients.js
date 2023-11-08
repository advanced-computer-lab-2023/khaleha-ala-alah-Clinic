import React, { useState, useEffect } from "react";

const DoctorPatients = ({ doctorId }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [appointments, setAppointments] = useState([]); // State to store doctor's appointments
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]); // State to store prescriptions

  useEffect(() => {
    // Fetch the doctor's patients and appointments
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
        setFilteredPatients(patientsData.data.patients); // Initialize filtered patients with all patients

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
        console.log(appointmentsData.appointments);
        setAppointments(appointmentsData.appointments);
        console.log(appointments);
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

    // Call the fetch function when the component mounts
    fetchDoctorData();
  }, [doctorId]);

  const viewPatientDetails = (patient) => {
    let myprescriptions = [];

    for (let i = 0; i < prescriptions.length; i++) {
      if (prescriptions[i].PatientID === patient.userID) {
        myprescriptions.push(prescriptions[i]);
      }
    }
    console.log(myprescriptions);
    let s = "";

    for (let i = 0; i < myprescriptions.length; i++) {
      s += `Prescription number : ${i + 1} summary : ${
        myprescriptions[i].summary
      }\n`;
    }
    alert(
      `Patient Name : ${patient.name} \nPatient Email : ${patient.email}\nPatient Gender : ${patient.gender}\nHealth records : ${s}`
    );
  };
  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);

    // Filter patients based on the search input
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // Further filter by upcoming appointments
    const now = new Date();
    const upcomingPatients = filtered.filter((patient) => {
      return appointments.some((appointment) => {
        const appointmentDate = new Date(appointment.timedAt);
        return appointmentDate > now && appointment.PatientID === patient._id;
      });
    });

    setFilteredPatients(upcomingPatients);
  };

  return (
    <div>
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
            {/* Include other patient details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPatients;
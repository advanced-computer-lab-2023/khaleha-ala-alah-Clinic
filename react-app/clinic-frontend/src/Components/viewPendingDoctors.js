import React, { useState, useEffect } from "react";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all doctors
    const fetchAllDoctors = async () => {
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
        console.log(data.data.pendingDoctors);
        setDoctors(data.data.pendingDoctors);
        console.log(doctors);
      } catch (err) {
        setError(err.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchAllDoctors();
  }, []);

  const pendingDoctors = doctors.filter(
    (doctor) => doctor.status === "pending"
  );

  return (
    <div>
      <h2>Pending Doctors</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {pendingDoctors.map((doctor) => (
          <li key={doctor._id} onClick={() => setSelectedDoctor(doctor)}>
            {doctor.name}
          </li>
        ))}
      </ul>
      {selectedDoctor && (
        <div>
          <h3>Selected Doctor Details</h3>
          <p>Name: {selectedDoctor.name}</p>
          <p>Email: {selectedDoctor.email}</p>
          <p>speciality: {selectedDoctor.speciality}</p>
          <p>affiliation: {selectedDoctor.affiliation}</p>
          <p>HourlyRate: {selectedDoctor.hourlyRate}</p>

          {/* Display other doctor details as needed */}
        </div>
      )}
    </div>
  );
};

export default PendingDoctors;
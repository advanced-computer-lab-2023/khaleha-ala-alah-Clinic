import React, { useState, useEffect } from "react";

const getSessionPrice = (doctor, currentPatient) => {
  // Replace this logic with your actual session price calculation
  // Here, I'm assuming session price is based on some fixed rate
  console.log(doctor.hourlyRate + "BBBB");
  let fixedSessionRate = doctor.hourlyRate + 0.1 * doctor.hourlyRate;
  console.log(fixedSessionRate + "AAAA");
  if (currentPatient.packageName && currentPatient.packageName != "none")
    fixedSessionRate =
      fixedSessionRate - currentPatient.doctorsDiscount * fixedSessionRate;
  console.log(fixedSessionRate);
  return fixedSessionRate;
};

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);

  useEffect(() => {
    // Function to fetch the list of doctors
    const fetchDoctors = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            "authorization": "Bearer " + localStorage.getItem("token")
          },
        };
        const response = await fetch(
          "http://localhost:4000/doctors/Alldoctors"
        , requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctors(data.data.Doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Function to fetch the current patient's discounts
    const fetchPatientDiscounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/patients/currentPatient"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentPatient(data.data.user); // Adjust the data structure as needed
      } catch (error) {
        console.error("Error fetching patient discounts:", error);
      }
    };

    // Call the functions to fetch data when the component mounts
    fetchDoctors();
    fetchPatientDiscounts();
  }, []);

  return (
    <div>
      <h2>List of Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <p>Name: {doctor.name}</p>
            <p>Speciality: {doctor.speciality}</p>
            <p>Session Price: {getSessionPrice(doctor, currentPatient)} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
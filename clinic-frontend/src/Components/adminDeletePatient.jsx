import React, { useState, useEffect } from "react";

const DeletePatient = () => {
  const [patients, setAllPatients] = useState([]);

  // Function to fetch all health packages
  const fetchAllPatients = async () => {
    try {
      const patientResponse = await fetch(
        "http://localhost:4000/patients/getAllPatients"
      );
      if (!patientResponse.ok) {
        throw new Error("Failed to fetch data");
      }
      const patientData = await patientResponse.json();
      console.log(patientData.data.patients);
      setAllPatients(patientData.data.patients);
    } catch (err) {
      //setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllPatients();
  }, []);

  return <div></div>;
};

export default DeletePatient;

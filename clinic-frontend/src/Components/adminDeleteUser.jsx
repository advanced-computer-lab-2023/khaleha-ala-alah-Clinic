import React, { useState, useEffect } from "react";

const HealthPackages = () => {
  const [users, setAllUsers] = useState([]);

  // Function to fetch all health packages
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/doctors/viewAllDoctors"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      console.log("HIee");
      const patientResponse = await fetch(
        "http://localhost:4000/patients/getAllPatients"
      );
      if (!patientResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const patientData = await patientResponse.json();
      setAllUsers(data.data.Doctors.concat(patientData.data.patients));
      console.log(data.data.Doctors.concat(patientData.data.patients));
    } catch (err) {
      //setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllUsers();
  }, []);

  return <div></div>;
};

export default HealthPackages;

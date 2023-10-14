import React, { useState, useEffect } from "react";

function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    // Fetch data from the server's endpoint
    fetch("http://localhost:4000/patients/currentPatient")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && data.data.user.familyMembers) {
          setFamilyMembers(data.data.user.familyMembers);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Family Members</h2>
      <ul>
        {familyMembers.map((familyMember, index) => (
          <li key={index}>
            <p>Name: {familyMember.name}</p>
            <p>National ID: {familyMember.nationalID}</p>
            <p>Age: {familyMember.age}</p>
            <p>Gender: {familyMember.gender}</p>
            <p>Relation: {familyMember.relationToPatient}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FamilyMembers;

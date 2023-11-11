import React, { useState, useEffect } from "react";
import DataTable from "../Elements/DataTable.jsx";
import './viewFamilyMembers.css';

function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState([]);

  
  const FamilyMemberColumns = [
    { key: "name", title: "Name" },
    { key: "nationalID", title: "National ID" },
    { key: "age", title: "Age" },
    { key: "gender", title: "Gender" },
    { key: "relation", title: "Relation" },
  ];

  const FamilyMembers = familyMembers.map((familyMember, index) => ({
    name: familyMember ? familyMember.name : "N/A",
    nationalID: familyMember ? familyMember.nationalID : "N/A",
    age: familyMember? familyMember.age : "N/A",
    gender: familyMember? familyMember.gender : "N/A",
    relation: familyMember ? familyMember.relationToPatient : "N/A",
  }));

  useEffect(() => {
    // Fetch data from the server's endpoint
    const requestOptions = {
      method: 'GET',
      headers: {
        "authorization": "Bearer " + localStorage.getItem("token")
      },
    };
    fetch("http://localhost:4000/patients/currentPatient", requestOptions)
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
      <h1>Family Members</h1>
      {/* <ul>
        {familyMembers.map((familyMember, index) => (
          <li key={index}>
            <p>Name: {familyMember.name}</p>
            <p>National ID: {familyMember.nationalID}</p>
            <p>Age: {familyMember.age}</p>
            <p>Gender: {familyMember.gender}</p>
            <p>Relation: {familyMember.relationToPatient}</p>
          </li>
        ))}
      </ul> */}

        <div className="FamilyMemberTable">
          <DataTable
            data={FamilyMembers}
            columns={FamilyMemberColumns}
          />
        </div>

    </div>
  );
}

export default FamilyMembers;

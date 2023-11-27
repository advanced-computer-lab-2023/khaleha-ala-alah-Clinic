import React, { useState, useEffect } from "react";
import DataTable from "../Elements/DataTable.jsx";
import Table from "./table.jsx";
import styles from "./viewFamilyMember.module.css";
import NavBar from "../Elements/NavBar.jsx";
import LoadingPage from "./LoadingPage.jsx";

import Header from "../Elements/Header";

function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  /*
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
    age: familyMember ? familyMember.age : "N/A",
    gender: familyMember ? familyMember.gender : "N/A",
    relation: familyMember ? familyMember.relationToPatient : "N/A",
  }));
*/
  useEffect(() => {
    // Fetch data from the server's endpoint
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch("http://localhost:4000/patients/currentPatient", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && data.data.user.familyMembers) {
          setFamilyMembers(data.data.user.familyMembers);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const data = familyMembers.map((familyMember, index) => ({
    name: familyMember.name,
    nationalID: familyMember.nationalID,
    gender: familyMember.gender,
    age: familyMember.age,
    relation: familyMember.relationToPatient,
  }));

  const columns = [
    // Define columns similar to PatientsTable
    // Example column:
    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
      className: styles.tableHeader,
    },
    {
      title: "National Identification Number",
      dataIndex: "nationalID",
      key: "NID",
      className: styles.tableHeader,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: styles.tableHeader,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      className: styles.tableHeader,
    },
    {
      title: "Relation",
      dataIndex: "relation",
      key: "relation",
      className: styles.tableHeader,
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className={styles.FamilymembersContainer}>
          <Header />
          <NavBar
            selectedSection={"familyMembers"}
            selectedSubSection="viewFamilyMembers"
          />
          {/*<h1 className={styles.h1}>Welcome to our Family Member Management portal</h1>*/}
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

          {/*<div className="FamilyMemberTable">
            <DataTable data={FamilyMembers} columns={FamilyMemberColumns} />
          </div>*/}
          <div className={styles.tableWrapper}>
            <Table data={data} columns={columns} />
          </div>
        </div>
      )}
    </>
  );
}

export default FamilyMembers;

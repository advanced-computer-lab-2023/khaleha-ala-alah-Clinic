import React, { useState, useEffect } from "react";
import PackageCard from "./familyMemberCard";
//import "./packageCard.css"; // Assuming you have a CSS file for styling
import axios from "axios";
//import "./familyMembercard.css";
import FamilyMemberDetails from "./familyMemberDetails";
import SubscribeToFamilyMemberPackage from "./subscribeToFamilyMemberPackage";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import Table from "./table.jsx";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const FamilyMembersPackages = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateTo = (path) => {
    navigate(path); // Call navigate with the path
  };
  const [patientFamilyMembers, setPatientFamilyMember] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define the function that fetches the packages
    const fetchPackages = async () => {
      try {
        // Make the HTTP request to the API
        const customHeaders = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // Replace with the appropriate content type if needed
        };

        const response = await fetch(
          "http://localhost:4000/patients/getFamilyMembersPatients",
          {
            method: "GET", // Change the method if needed (GET, POST, etc.)
            headers: customHeaders, // Set the custom headers here
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        // Update the state with the fetched packages
        setPatientFamilyMember(data.data.patientFamilyMembers);
        setFamilyMembers(data.data.familyMembers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    // Call the function
    fetchPackages();
  }, []);

  const columns = [
    // Define columns similar to PatientsTable
    // Example column:
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.name.localeCompare(b.name), // Sort alphabetically

      // Add sorter or other properties as needed
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      //className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.age - b.age, // Sort numerically

      // Add sorter or other properties as needed
    },
    {
      title: "Relation To Patient",
      dataIndex: "relation",
      key: "relation",
      //className: styles.tableHeader, // Apply custom header style

      // Add sorter or other properties as needed
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      //className: styles.tableHeader, // Apply custom header style
    },
    {
      title: "Package Status",
      dataIndex: "status",
      key: "status",
      //className: styles.tableHeader, // Apply custom header style

      // Add sorter or other properties as needed
    },
    {
      title: "Package End Date",
      dataIndex: "packageEndDate",
      key: "packageEndDate",
      //className: styles.tableHeader,
    },
    // ... other columns
    /*{
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="buttons-list nowrap">
          { Replace these actions as per your requirement }
          <Button shape="circle" onClick={() => navigate("/some-route")}>
            <span className="icofont icofont-external-link" />
          </Button>
          <Button shape="circle" type="primary">
            <span className="icofont icofont-edit-alt" />
          </Button>
          <Button shape="circle" danger>
            <span className="icofont icofont-ui-delete" />
          </Button>
        </div>
      ),
    },
    */
  ];

  const data = familyMembers
    .filter((familyMember, i) => !familyMember.userID)
    .map((familyMember, i) => ({
      patient: familyMember,
      name: familyMember.name,
      relation: familyMembers[i].relationToPatient,
      age: familyMembers[i].age,
      gender: familyMembers[i].gender,
      status:
        familyMember.packageEndDate === null
          ? "Unubscribed"
          : familyMember.packageName === "none" &&
            familyMember.packageEndDate !== null
          ? "Ended"
          : "Subscribed",
      packageEndDate: familyMember.packageEndDate
        ? formatDate(familyMember.packageEndDate)
        : "NO SUBSCRIBED PACKAGE",
    }));

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <>
          <div>
            <Header />
            <NavBar
              selectedSection={"packages"}
              selectedSubSection={"familyMemberPackages"}
            />
          </div>
          <div className="famPack">
            <h5>
              Click On Any Row To Subscribe/View Details of the family member
              package
            </h5>
            <Table
              data={data}
              columns={columns}
              clickable={true}
              onRowClick={(record) => {
                console.log("CLICKED");
                console.log(record.patient);
                if (record.patient.packageName === "none") {
                  navigate("/subscribeToFamilyMemberPackage", {
                    state: { familyMember: record.patient },
                  });
                } else {
                  navigate("/familyMemberDetails", {
                    state: {
                      patient: record.patient,
                    },
                  });
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default FamilyMembersPackages;

/*
                onclick={() => {
                  console.log(familyMember);
                  if (familyMember.packageName === "none") {
                    navigate("/subscribeToFamilyMemberPackage", {
                      state: { familyMember: familyMember },
                    });
                  } else {
                    navigate("/familyMemberDetails", {
                      state: {
                        patient: familyMember,
                      },
                    });
                  }
                }} // Handle the click event
                */

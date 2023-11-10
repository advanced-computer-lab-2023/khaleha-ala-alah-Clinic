import React, { useState, useEffect } from "react";
import PackageCard from "./familyMemberCard";
import "./packageCard.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import "./familyMembercard.css";
import FamilyMemberDetails from "./familyMemberDetails";
import SubscribeToFamilyMemberPackage from "./subscribeToFamilyMemberPackage";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="famPack">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {patientFamilyMembers.map((familyMember, i) => (
            <PackageCard
              className="familyMemberCard"
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
              //key={packageItem.id} // Use a unique key for each child, like an ID
              name={familyMember.name}
              details={[
                {
                  label: "Relation",
                  value: `${familyMembers[i].relationToPatient}`,
                },
                {
                  label: "Age",
                  value: `${familyMembers[i].age}`,
                },
                {
                  label: "Gender",
                  value: `${familyMembers[i].gender}`,
                },
                {
                  label: "Package Status",
                  value: `${
                    familyMember.packageEndDate === null
                      ? "Unubscribed"
                      : familyMember.packageName === "none" &&
                        familyMember.packageEndDate !== null
                      ? "Ended"
                      : "Subscribed"
                  }`,
                },
                familyMember.packageEndDate
                  ? {
                      label: "Package End Date",
                      value: `${formatDate(familyMember.packageEndDate)}`,
                    }
                  : {},
              ]} // Adjust based on the actual structure of your package data
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FamilyMembersPackages;

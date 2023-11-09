import React from "react";
import "./packageManagment.css"; // Your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ManagePackages = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateTo = (path) => {
    navigate(path); // Call navigate with the path
  };
  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState({});

  useEffect(() => {
    const getCurrentPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/patients/getHealthCareDetails",
          {
            headers: {
              // Assuming you're sending the token for authentication
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStatus(response.data.data);
        console.log(response.data + "ALOOOOO");
      } catch (error) {
        console.error("Error fetching current patient", error);
        // Handle error...
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentPatient();
  }, []);
  return (
    <div className="manage-packages">
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <h1 className="title">Manage Packages For</h1>

          <div className="card" onClick={() => navigateTo("/myselfPackages")}>
            <h2>Myself</h2>
            <p>Description for personal packages...</p>
            <p>Current Status : {status.status} </p>
            {status.status === "Ended" ? (
              <p>Package Cancel Date : {formatDate(status.packageEndDate)}</p>
            ) : status.status === "Subscribed" ? (
              <p>Package End Date : {formatDate(status.packageEndDate)}</p>
            ) : null}
          </div>
          <div
            className="card"
            onClick={() => navigateTo("/familyMemberPackages")}
          >
            <h2>My Family Members</h2>
            <p>
              Description for family
              packagesgpjfioghprehvpioerhverhogvheovheriohtvoiwhetois...
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePackages;

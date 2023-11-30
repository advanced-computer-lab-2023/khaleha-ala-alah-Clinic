import React from "react";
import "./packageManagment.css"; // Your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import styles from "./packagesManagementAdmin.module.css";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PackagesManagementAdmin = () => {
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
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <>
          <div className="manage-packages">
            <h1 className="title">Manage Packages</h1>

            <div
              className="card"
              onClick={() => navigateTo("/addPackageAdmin")}
            >
              <h2>Add Health Package</h2>
              <p>Add new health package</p>
            </div>
            <div className="card" onClick={() => navigateTo("/packages")}>
              <h2>Update Health Package</h2>
              <p>Update current health package</p>
            </div>
            <div
              className="card"
              onClick={() => navigateTo("/deletePackageAdmin")}
            >
              <h2>Delete Health Package</h2>
              <p>Delete current health package</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PackagesManagementAdmin;

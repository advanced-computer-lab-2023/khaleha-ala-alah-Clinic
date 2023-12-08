import React from "react";
import "./packageManagment.css"; // Your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import styles from './packageManagement.module.css';

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
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <>
          <Header />
          <NavBar selectedSection={"packages"} />
          <div className="manage-packages">
            <h1 className="title">Manage Packages For</h1>

            <div  className={styles.bigCont}>

           

            <div  className={styles.addFamMemCont} onClick={() => navigateTo("/myselfPackages")}>
              <h2>Myself</h2>
              <p className={styles.addFamMemPar} style={{marginTop:'1rem'}}> Discover tailored healthcare packages designed exclusively for you.</p>
              <p className={styles.addFamMemPar}>Current Status : {status.status} </p>
              {status.status === "Ended" ? (
                <p className={styles.addFamMemPar}>Package Cancel Date : {formatDate(status.packageEndDate)}</p>
              ) : status.status === "Subscribed" ? (
                <p className={styles.addFamMemPar}  style={{marginBottom:'1rem'}}>Package End Date : {formatDate(status.packageEndDate)}</p>
              ) : null}
            </div>
            <div
               className={styles.addFamMemCont}
              onClick={() => navigateTo("/familyMemberPackages")}
            >
              <h2>My Family Members</h2>
              <p className={styles.addFamMemPar}  style={{marginTop:'1rem'}}>
              Explore exclusive family packages designed to provide comprehensive healthcare for your loved ones. 
              </p>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManagePackages;

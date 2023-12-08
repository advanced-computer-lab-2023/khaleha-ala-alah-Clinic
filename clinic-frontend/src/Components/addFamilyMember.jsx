import React from "react";
import "./packageManagment.css"; // Your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import styles from './addFamilyMember.module.css';

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ManagePackages = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateTo = (path) => {
    navigate(path); // Call navigate with the path
  };
  const [isLoading, setIsLoading] = useState(false);

  //const [status, setStatus] = useState({});

  return (
    <div className="manage-packages">
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <div style={{ marginBottom: "50px" }}>
            <Header />
            <NavBar
              selectedSection={"familyMembers"}
              selectedSubSection="addFamilyMember"
            />
          </div>

          <h1 className="title">Add New Family Member Using </h1>
          <div className={styles.bigCont}>
          <div
            className={styles.addFamMemCont}
            onClick={() => navigateTo("/registerFamilyMember")}
          >
            <h2>National Identification Number</h2>
            <p className={styles.addFamMemPar}>Provide the unique National 
              Identification Number to register a new family member. </p>
          </div>
          <div
            className={styles.addFamMemCont}
            onClick={() => navigateTo("/addFamilyMemberUsingEmail")}
          >
            <h2>Email</h2>
            <p className={styles.addFamMemPar}>
            Add a family member using their email address. Join our network and enjoy the convenience of managing your family's health in one place.
            </p>
          </div>
          <div
            className={styles.addFamMemCont}
            onClick={() => navigateTo("/addFamilyMemberUsingPhone")}
          >
            <h2>Phone Number</h2>
            <p className={styles.addFamMemPar}>
            Add a family member using their phone number and explore our family packages designed to offer a comprehensive healthcare solution
            </p>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePackages;

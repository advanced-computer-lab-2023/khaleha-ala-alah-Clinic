// PackageDetails.js
import React from "react";
import "./packageDetails.css"; // Import the stylesheet for this component

import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import styles from './packageDetails.module.css';

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PackageDetails = ({ patient, onUnsubscribe }) => {
  if (!patient) {
    return <div>No patient data available.</div>;
  }

  return (
    <div>
       <Header />
          <NavBar />
    
    <div className={styles.packDetailsCont}>
      {/* <h1 className="package-details-title">Package Details</h1> */}
        <p className={styles.pText}>
          <strong>Package Name:</strong> {patient.packageName}
        </p>
        <p className={styles.pText}>
          <strong>End Date:</strong> {formatDate(patient.packageEndDate)}
        </p>
        <p className={styles.pText}>
          <strong>Medical Discount:</strong>{" "}
          {patient.medicalDiscount < 1
            ? patient.medicalDiscount * 100
            : patient.medicalDiscount}
          %
        </p>
        <p className={styles.pText}>
          <strong>Doctor's Discount:</strong>{" "}
          {patient.doctorsDiscount < 1
            ? patient.doctorsDiscount * 100
            : patient.doctorsDiscount}
          %
        </p>
        <p className={styles.pText}>
          <strong>Family Discount:</strong>{" "}
          {patient.familyDiscount < 1
            ? patient.familyDiscount * 100
            : patient.familyDiscount}
          %
        </p>
        <button className={styles.button} onClick={onUnsubscribe}>
          Unsubscribe
        </button>
      </div>
    </div>
  );
};

export default PackageDetails;

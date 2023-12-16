// PackageDetails.js
import React from "react";
import "./packageDetails.css"; // Import the stylesheet for this component
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import styles from "./packageDetails.module.css";

import NavBar from "../Elements/NavBar";
import Header from "../Elements/Header";

import axios from "axios";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PackageDetails = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  //const onUnsubscribe = location.state?.onUnsubscribe;
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateTo = (path) => {
    navigate(path); // Call navigate with the path
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:4000/patients/unsubscribeFromFamilyMember?id=${patient.userID}&nationalID=${patient.nationalID}`,
        {
          // Include necessary data for the unsubscribe request
          // For example, if you need to send the patient ID:
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json", // This is typically not needed as axios sets it by default when sending an object
            // ... any other headers
          },
        }
      );
      console.log("Unsubscription successful:", response.data);
      setShowConfirmationDialog(false); // Close the dialog
    } catch (error) {
      console.error("Error unsubscribing:", error);
      // Handle error...
    } finally {
      setIsLoading(false);
      navigateTo("/managePackages");
    }
  };
  if (!patient) {
    return <div>No patient data available.</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <NavBar
            selectedSection={"packages"}
            selectedSubSection={"familyMemberPackages"}
          />
          {/* <h1 className="package-details-title">Package Details</h1> */}
          <div className={styles.packDetailsCont}>
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
            {/* {patient.selfSubscription === false ? (
              <button
              className={styles.button}
                onClick={() => setShowConfirmationDialog(true)}
              >
                Unsubscribe
              </button>
            ) : null} */}
            {/* {showConfirmationDialog && (
              <ConfirmationDialog
                message="Are you sure you want to unsubscribe?"
                confirmLabel="Yes"
                cancelLabel="No"
                onConfirm={handleUnsubscribe}
                onCancel={() => setShowConfirmationDialog(false)}
              />
            )} */}
            <button
              className={styles.button}
              onClick={() => setShowConfirmationDialog(true)}
            >
              Unsubscribe
            </button>
          </div>
          {showConfirmationDialog && (
            <ConfirmationDialog
              message="Are you sure you want to unsubscribe?"
              confirmLabel="Yes"
              cancelLabel="No"
              onConfirm={handleUnsubscribe}
              onCancel={() => setShowConfirmationDialog(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PackageDetails;

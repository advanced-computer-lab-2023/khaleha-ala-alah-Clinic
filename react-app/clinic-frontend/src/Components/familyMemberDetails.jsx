// PackageDetails.js
import React from "react";
import "./packageDetails.css"; // Import the stylesheet for this component
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";

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
        `http://localhost:4000/patients/unsubscribeFromFamilyMember?id=${patient.userID}`,
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
    <div className="package-details-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <NavBar
            selectedSection={"packages"}
            selectedSubSection={"familyMemberPackages"}
          />
          <h1 className="package-details-title">Package Details</h1>
          <div className="package-details-content">
            <p>
              <strong>Package Name:</strong> {patient.packageName}
            </p>
            <p>
              <strong>End Date:</strong> {formatDate(patient.packageEndDate)}
            </p>
            <p>
              <strong>Medical Discount:</strong>{" "}
              {patient.medicalDiscount < 1
                ? patient.medicalDiscount * 100
                : patient.medicalDiscount}
              %
            </p>
            <p>
              <strong>Doctor's Discount:</strong>{" "}
              {patient.doctorsDiscount < 1
                ? patient.doctorsDiscount * 100
                : patient.doctorsDiscount}
              %
            </p>
            <p>
              <strong>Family Discount:</strong>{" "}
              {patient.familyDiscount < 1
                ? patient.familyDiscount * 100
                : patient.familyDiscount}
              %
            </p>
            {patient.selfSubscription === false ? (
              <button
                className="unsubscribe-button"
                onClick={() => setShowConfirmationDialog(true)}
              >
                Unsubscribe
              </button>
            ) : null}
            {showConfirmationDialog && (
              <ConfirmationDialog
                message="Are you sure you want to unsubscribe?"
                confirmLabel="Yes"
                cancelLabel="No"
                onConfirm={handleUnsubscribe}
                onCancel={() => setShowConfirmationDialog(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PackageDetails;

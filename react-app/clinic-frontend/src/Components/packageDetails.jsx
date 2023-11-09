// PackageDetails.js
import React from "react";
import "./packageDetails.css"; // Import the stylesheet for this component

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PackageDetails = ({ patient, onUnsubscribe }) => {
  if (!patient) {
    return <div>No patient data available.</div>;
  }

  return (
    <div className="package-details-container">
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
        <button className="unsubscribe-button" onClick={onUnsubscribe}>
          Unsubscribe
        </button>
      </div>
    </div>
  );
};

export default PackageDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FollowUpScheduler.module.css";

const FollowUpScheduler = ({ onCancel, patient }) => {
  //const [patientID, setPatientID] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const patientID = patient.userID;

  // Fetch the list of patients when the component mounts
  function convertToISOFormat(dateTimeString) {
    // Step 1: Decode the URL-encoded string
    let decodedString = decodeURIComponent(dateTimeString);

    // Step 2: Replace the space with a 'T' to conform to ISO 8601 format
    let isoString = decodedString.replace(" ", "T");

    // Step 3: Append the milliseconds and timezone offset
    isoString += ":00.000+00:00";

    return isoString;
  }
  function Decraese2HoursToISOFormat(dateTimeString) {
    // Step 1: Decode the URL-encoded string
    let decodedString = decodeURIComponent(dateTimeString);

    // Step 2: Replace the space with a 'T' to conform to ISO 8601 format
    let isoString = decodedString.replace(" ", "T");

    // Step 3: Create a Date object from the isoString
    let date = new Date(isoString);

    // Step 4: Decrease the hour by 2
    date.setHours(date.getHours() - 2);

    // Step 5: Convert back to ISO string format
    isoString = date.toISOString();

    // Step 6: Append the milliseconds and timezone offset
    isoString = isoString.replace("Z", "+00:00");

    return isoString;
  }


  const scheduleFollowUp = async () => {
    try {
      // const formattedDateTime1 = selectedDateTime.replace("T", " ");
      // console.log(formattedDateTime1);
      let formattedDateTime = Decraese2HoursToISOFormat(
        convertToISOFormat(selectedDateTime)
      );
      console.log(formattedDateTime);
      console.log(patientID);
      const response = await axios.post(
        `http://localhost:4000/doctors/scheduleFollowUpPatient/${patientID}/${formattedDateTime}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Specify the content type if needed
          },
        }
      );

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage(`Error scheduling follow-up: ${error.message}`);
    }
  };


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  
  return (
      <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
        <div className={styles.confirmationDialog}>
      <h1>Follow-Up Scheduler</h1>
      <form className={styles.form}
        onSubmit={(e) => {
          console.log(patient);
          e.preventDefault();
          scheduleFollowUp();
          console.log(selectedDateTime)
        }}
      >
        <br />
        <label className={styles.label}>
          Follow-Up Date and Time:
          <input
            className={styles.input}
            type="datetime-local"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
        </label>
        <br />
        <button className={styles.button} type="submit">Schedule Follow-Up</button>
      </form>
      <p>{statusMessage}</p>
    </div>
    </div>

  );
};

export default FollowUpScheduler;

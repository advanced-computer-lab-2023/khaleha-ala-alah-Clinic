import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowUpScheduler = () => {
  const [patients, setPatients] = useState([]);
  const [patientID, setPatientID] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/doctors/getPatients",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // console.log("Patients response:", response); // Log the response to the console
        console.log(response.data.data.patients);
        setPatients(response.data.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error.message);
      }
    };

    fetchPatients();
  }, []);

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
          },
        }
      );

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage(`Error scheduling follow-up: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Follow-Up Scheduler</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          scheduleFollowUp();
        }}
      >
        <label>
          Select Patient:
          <select
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.userID} value={patient.userID}>
                {patient.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Follow-Up Date and Time:
          <input
            type="datetime-local"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Schedule Follow-Up</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default FollowUpScheduler;

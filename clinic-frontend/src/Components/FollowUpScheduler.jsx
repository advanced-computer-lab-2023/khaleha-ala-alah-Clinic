import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FollowUpScheduler.module.css";
import LoadingPage from "./LoadingPageForOverlay.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:4000";

const FollowUpScheduler = ({ onCancel, patient, doctor }) => {
  //const [patientID, setPatientID] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state for appointments
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8; // Adjust the number per your requirement
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const navigate = useNavigate();
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = availableAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const patientID = patient.userID;

  useEffect(() => {
    if (doctor) {
      fetch(
        `${backendUrl}/patients/doctorAppointmentsWithoutAuth/${doctor.userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("after fetching available appointments");
          if (data.status === "success") {
            setAvailableAppointments(data.data.availableAppointments);
          } else {
            console.error("Failed to fetch available appointments");
          }
          setLoading(false); // Set loading to false when data is retrieved
        });
    }
  }, []);

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
    console.log("ALO");
    console.log(dateTimeString);
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
      console.log(selectedAppointment);
      console.log(patientID);
      console.log(convertToISOFormat(selectedAppointment));
      let formattedDateTime = selectedAppointment;
      console.log(formattedDateTime);
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
      console.log(error);
    }
  };


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(availableAppointments.length / appointmentsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={currentPage === number ? styles.activePage : null}
      >
        {number}
      </button>
    );
  });

  return (
    <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
      <div className={styles.confirmationDialog}>
        <h1 className={styles.headerofFollowUp}>Follow-Up Scheduler</h1>
        <form
          className={styles.formOfFollowUp}
          onSubmit={(e) => {
            console.log(patient);
            e.preventDefault();
            console.log(selectedDateTime);
          }}
        >
          {loading ? (
            <LoadingPage />
          ) : (
            currentAppointments.map((appointment, index) => {
              const date = new Date(appointment);
              const appointmentLabel = `${date.toDateString()} - ${
                date.toTimeString().split(" ")[0]
              }`;
              return (
                <div key={index} className={styles.radioOfFollowUp}>
                  <input
                    type="radio"
                    id={`appointment_${index}`}
                    name="appointment"
                    value={appointment}
                    checked={selectedAppointment === appointment}
                    onChange={() => setSelectedAppointment(appointment)}
                  />
                  <label htmlFor={`appointment_${index}`}>
                    {appointmentLabel}
                  </label>
                </div>
              );
            })
          )}
          <div className={styles.pagination}>{renderPageNumbers}</div>

          <button className={styles.buttonOfFollowUp} type="submit" onClick = {(e) => {
            e.preventDefault();
            scheduleFollowUp();
          }}>
            Schedule Follow-Up
          </button>
        </form>
        <p className={styles.paragraphofFollowUp}>{statusMessage}</p>
      </div>
    </div>
  );
};

export default FollowUpScheduler;

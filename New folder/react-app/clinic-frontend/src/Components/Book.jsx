import React, { useState, useEffect } from "react";
import "./Book.css";
import doctorImage from "./doctor.png";
import AppointmentCard from "../Elements/AppointmentCard.jsx";
import { useLocation } from "react-router-dom";
import "../Elements/AppointmentCard.css";
import LoadingPage from "./LoadingPageForOverlay.jsx";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons"; // Importing a close icon from Ant Design
const backendUrl = "http://localhost:4000";

const Book = ({ onCancel, doctor }) => {
  const navigate = useNavigate();
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state for appointments
  const [isLoading, setIsLoading] = useState(true); // Add a loading state for CurrentPatient
  const [currentPatient, setCurrentPatient] = useState([]); // Add a currentPatient state
  const [patientFamilyMembers, setPatientFamilyMember] = useState([]); // Add a patientFamilyMember state
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
  const selectedDoctor = doctor; // Access the doctor object from the location

  useEffect(() => {
    if (selectedDoctor) {
      // Fetch available appointments for the selectedDoctor
      console.log("Selected doctor is: ", selectedDoctor);
      console.log("before fetching available appointments");
      fetch(
        `${backendUrl}/patients/doctorAppointments/${selectedDoctor.userID}`,
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
          console.log(data);
          console.log(data.data.availableAppointments);

          if (data.status === "success") {
            setAvailableAppointments(data.data.availableAppointments);
          } else {
            console.error("Failed to fetch available appointments");
          }
          setLoading(false); // Set loading to false when data is retrieved
        });
    }

    const fetchCurrentPatient = async () => {
      try {
        // Make the HTTP request to the API
        const response = await fetch(
          "http://localhost:4000/patients/currentPatient",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json", // Specify the content type if needed
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        console.log(data.data.user);
        // Update the state with the fetched packages
        setCurrentPatient(data.data.user);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPatientFamilyMembers = async () => {
      try {
        // Make the HTTP request to the API
        const customHeaders = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // Replace with the appropriate content type if needed
        };

        const response = await fetch(
          "http://localhost:4000/patients/getFamilyMembersPatients",
          {
            method: "GET", // Change the method if needed (GET, POST, etc.)
            headers: customHeaders, // Set the custom headers here
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        // Update the state with the fetched packages
        setPatientFamilyMember(data.data.patientFamilyMembers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    getPatientFamilyMembers();

    // Call the function
    fetchCurrentPatient();
  }, [selectedDoctor]);

  const handleCheckout = async (doctor, date) => {
    navigate("/appointmentCheckout", {
      state: { Doctor: doctor, Date: date, selectedOption: selectedOption },
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  
  return (
    <>
      <div>
        <label htmlFor="dropdown">Select an option:</label>
        <select id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Myself">Myself</option>
          {patientFamilyMembers.map((option, index) => (
            <option key={index} value={option.userID}>
              {option.name}
            </option>
          ))}
        </select>
        {selectedOption && <p>You selected: {selectedOption}</p>}
      </div>
      <div className="confirmationBackdrop" onClick={handleBackdropClick}>
        <div className="confirmationDialog">
          {loading ? ( // Render a loading message when loading is true
            <div className="testDiv">
              <LoadingPage />
            </div>
          ) : (
            availableAppointments.map((appointment, index) => {
              const date = new Date(appointment);
              return (
                <AppointmentCard
                  key={index}
                  details={[
                    { label: "Date", value: date.toDateString() }, // Convert the string to a Date object
                    {
                      label: "Time",
                      value: date.toTimeString().split(" ")[0],
                    },
                    // You can add more details as needed
                  ]}
                  buttonsDetails={[
                    {
                      text: "Book Now!",

                      onClick: () => handleCheckout(selectedDoctor, date),

                      // Handle the click event for booking here
                      // You can add an event handler for booking appointments
                    },
                    // Add other buttons as needed
                  ]}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Book;

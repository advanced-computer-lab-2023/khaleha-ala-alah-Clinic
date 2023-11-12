import React, { useState, useEffect } from "react";
import "./Book.css";
import doctorImage from "./doctor.png";
import AppointmentCard from "../Elements/AppointmentCard.jsx";
import { useLocation } from "react-router-dom";
import "../Elements/AppointmentCard.css";
import LoadingPage from "./LoadingPage.jsx";

const backendUrl = "http://localhost:4000";

const Book = () => {
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state for appointments
  const [isLoading, setIsLoading] = useState(true); // Add a loading state for CurrentPatient
  const [currentPatient, setCurrentPatient] = useState([]); // Add a currentPatient state

  const location = useLocation();
  const selectedDoctor = location.state && location.state.doctor; // Access the doctor object from the location

  useEffect(() => {
    if (selectedDoctor) {
      // Fetch available appointments for the selectedDoctor
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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    // Call the function
    fetchCurrentPatient();
  }, [selectedDoctor]);

  return (
    <>
      {loading || isLoading ? (
        <div>
          {" "}
          <LoadingPage />{" "}
        </div>
      ) : (
        <>
          <div className="book-container">
            <div className="doctor-photo">
              <img src={doctorImage} alt="Doctor" />
            </div>
            <div className="doctor-info-container">
              <div className="doctor-details">
                {loading ? ( // Render a loading message when loading is true
                  <p>Loading...</p>
                ) : selectedDoctor ? (
                  <>
                    <p>Name: {selectedDoctor.name}</p>
                    <p>Speciality: {selectedDoctor.speciality}</p>
                    <p>Email: {selectedDoctor.email}</p>
                    <p>Affiliation: {selectedDoctor.affiliation}</p>
                    <p>
                      Educational Background:{" "}
                      {selectedDoctor.educationalBackground}
                    </p>
                    <p>
                      Session Price :{" "}
                      {currentPatient.packageName === "none" ? (
                        selectedDoctor.hourlyRate
                      ) : (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginRight: "5px",
                            }}
                          >
                            {`${selectedDoctor.hourlyRate}`}
                          </span>
                          {`${
                            selectedDoctor.hourlyRate -
                            selectedDoctor.hourlyRate *
                              (currentPatient.doctorsDiscount < 1
                                ? currentPatient.doctorsDiscount
                                : currentPatient.doctorsDiscount / 100.0)
                          }`}
                        </>
                      )}
                    </p>
                  </>
                ) : (
                  <p>Select a doctor to view details and appointments.</p>
                )}
              </div>
            </div>
          </div>
          <div className="slots-container">
            <div className="AppointmentPack">
              {loading ? ( // Render a loading message when loading is true
                <p>Loading appointments...</p>
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
      )}
    </>
  );
};

export default Book;

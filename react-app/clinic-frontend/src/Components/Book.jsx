import React from "react";
import "./Book.css";
import doctorImage from "./doctor.png";
import AppointmentCard from "../Elements/AppointmentCard.jsx";
import "../Elements/AppointmentCard.css";

const Book = () => {
  const availableAppointments = [
    { date: "2023-11-15", time: "09:00 AM" },
    { date: "2023-11-16", time: "02:30 PM" },
    { date: "2023-11-16", time: "02:30 PM" },
    { date: "2023-11-16", time: "02:30 PM" },
    { date: "2023-11-15", time: "09:00 AM" },
    { date: "2023-11-16", time: "02:30 PM" },
    { date: "2023-11-16", time: "02:30 PM" },
    { date: "2023-11-16", time: "02:30 PM" },
  ];

  return (
    <>
      <div className="book-container">
        <div className="doctor-photo">
          <img src={doctorImage} alt="Doctor" />
        </div>
        <div className="doctor-info-container">
          <div className="doctor-details">
            <p>Name: None</p>
            <p>Speciality: None</p>
            <p>Email: None</p>
            <p>Gender: None</p>
            <p>Affiliation: None</p>
            <p>Educational Background: None</p>
          </div>
        </div>
      </div>
      <div className="slots-container">
        <div className="AppPack">
          {availableAppointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              details={[
                { label: "Date", value: appointment.date },
                { label: "Time", value: appointment.time },
                // You can add more details as needed
              ]}
              buttonsDetails={[
                {
                  text: "Book Now!",
                  // Handle the click event for booking here
                },
                // Add other buttons as needed
              ]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Book;

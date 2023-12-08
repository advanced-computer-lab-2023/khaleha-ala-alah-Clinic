import React, { useState } from "react";
import axios from "axios";
import NavBar from "../Elements/NavBarDoctor.jsx";
import Header from "../Elements/HeaderDoctor";

import styles from "./avaliableSlots.module.css"

const AvailableSlotsForm = () => {
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [period, setPeriod] = useState("am"); // Default to 'am'
  const [statusMessage, setStatusMessage] = useState("");

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleHoursChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]{0,2}$/.test(value)) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]{0,2}$/.test(value)) {
      setMinutes(value);
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedHour = `${hours}:${minutes.padStart(
      2,
      "0"
    )} ${period.toUpperCase()}`;

    try {
      const response = await axios.patch(
        "http://localhost:4000/doctors/addAvaliableSlots",
        { fixedSlots: [{ day, hour: formattedHour }] },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //console.log(response.status);
      console.log(response.data);
      setStatusMessage("slot added successfully");
    } catch (error) {
      setStatusMessage(`Error adding available slots: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <NavBar/>
      <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.labelSlot} >Select Day</label>
          <select value={day} onChange={handleDayChange} className={styles.selectDay}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        
        </div>
        <div>
        <label className={styles.labelSlot}> Select Time</label>
          <input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            pattern="[0-9]{0,2}"
            className={styles.input}
            placeholder="hour"
          />
          :
          <input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            pattern="[0-9]{0,2}"
            className={styles.input}
            placeholder="min"
          />
          <select value={period} onChange={handlePeriodChange} className={styles.select}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        
        </div>
        <button type="submit" className={styles.button}>Add Available Slot</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default AvailableSlotsForm;

import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Available Slots Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <select value={day} onChange={handleDayChange}>
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>
        <br />
        <label>
          Time:
          <input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            pattern="[0-9]{0,2}"
          />
          :
          <input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            pattern="[0-9]{0,2}"
          />
          <select value={period} onChange={handlePeriodChange}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </label>
        <br />
        <label>
          Time:    
          <input type="text" value={hours} onChange={handleHoursChange} pattern="[0-9]{0,2}" />:
          <input type="text" value={minutes} onChange={handleMinutesChange} pattern="[0-9]{0,2}" />
        </label>
        <select value={period} onChange={handlePeriodChange}>
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
        <br />
        <button type="submit">Add Available Slots</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default AvailableSlotsForm;

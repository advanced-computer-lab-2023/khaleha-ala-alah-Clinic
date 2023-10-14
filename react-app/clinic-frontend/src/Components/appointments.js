import React, { useState, useEffect } from "react";
const backendUrl = "http://localhost:4000";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    // Fetch appointments data
    fetch(`${backendUrl}/patients/getappointments`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the retrieved data here
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);

        // Fetch doctors data
        fetch(`${backendUrl}/patients/patientdoctors`)
          .then((response) => response.json())
          .then((data) => {
            // Handle the retrieved data here
            setDoctors(data.doctors);
          })
          .catch((error) => console.error("Error fetching doctors:", error));
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  // Define the filterAppointments function to apply filters
  const filterAppointments = () => {
    const filteredAppointments = appointments.filter((appointment) => {
      const formattedAppointmentDate = new Date(appointment.timedAt)
        .toISOString()
        .split("T")[0]; // Convert to 'YYYY-MM-DD'

      // Check if the appointment date matches the date filter
      const dateFilterPassed =
        dateFilter === "" || formattedAppointmentDate === dateFilter;

      let status = "confirmed";
      if (appointment.timedAt > Date.now()) {
        status = "pending";
      }

      // Check if the appointment status matches the status filter
      const statusFilterPassed =
        statusFilter === "all" || status === statusFilter;

      return dateFilterPassed && statusFilterPassed;
    });

    // Update the state with filtered appointments
    setFilteredAppointments(filteredAppointments);
  };

  return (
    <div>
      <h1>View Your Appointments</h1>
      <label htmlFor="dateFilter">Filter by Date:</label>
      <input
        type="date"
        id="dateFilter"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <label htmlFor="statusFilter">Filter by Status:</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="confirmed">Finished</option>
        <option value="pending">Pending</option>
      </select>

      <button onClick={filterAppointments}>Filter</button>

      <ul id="appointmentsList">
        {filteredAppointments.map((appointment, index) => (
          <li key={index}>
            {
              <div>
                <p>Date: {new Date(appointment.timedAt).toDateString()}</p>
                <p>Name: {doctors[index] ? doctors[index].name : "N/A"}</p>
                <p>
                  Speciality:
                  {doctors[index] ? doctors[index].speciality : "N/A"}{" "}
                </p>
                <p>Email:{doctors[index] ? doctors[index].email : "N/A"} </p>
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;

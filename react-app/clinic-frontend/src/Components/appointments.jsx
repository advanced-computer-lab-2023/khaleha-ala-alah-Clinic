import React, { useState, useEffect } from "react";
import PackageCard from "../Elements/packageCard.jsx";
import "./appointments.css";
import DataTable from "../Elements/DataTable.jsx";
import "../Elements/DataTable.css";
import LoadingPage from "./LoadingPage.jsx";

const backendUrl = "http://localhost:4000";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true); // Add loading state

  const appointmentsforPatient = filteredAppointments.map(
    (appointment, index) => ({
      date: new Date(appointment.timedAt).toDateString(),
      doctor: doctors[index] ? doctors[index].name : "N/A",
      speciality: doctors[index] ? doctors[index].speciality : "N/A",
      email: doctors[index] ? doctors[index].email : "N/A",
    })
  );

  const appointmentsColumns = [
    { key: "date", title: "Date" },
    { key: "doctor", title: "Doctor" },
    { key: "speciality", title: "Doctor's Speciality" },
    { key: "email", title: "Doctor's Email" },
  ];

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    // Fetch appointments data
    fetch(`${backendUrl}/patients/getappointments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Specify the content type if needed
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.appointments);
        // Handle the retrieved data here
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);

        // Fetch doctors data
        fetch(`${backendUrl}/patients/patientdoctors`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Specify the content type if needed
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the retrieved data here
            setDoctors(data.doctors);

            // Set loading to false once both appointments and doctors data are fetched
            setLoading(false);
          })
          .catch((error) => console.error("Error fetching doctors:", error));
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        // Set loading to false in case of an error
        setLoading(false);
      });
  };

  // Define the filterAppointments function to apply filters
  const filterAppointments = () => {
    const filteredAppointments = appointments.filter((appointment) => {
      const formattedAppointmentDate = new Date(appointment.timedAt)
        .toISOString()
        .split("T")[0]; // Convert to 'YYYY-MM-DD'

      const dateNow = new Date(Date.now()).toISOString().split("T")[0];

      // Check if the appointment date matches the date filter
      const dateFilterPassed =
        dateFilter === "" || formattedAppointmentDate === dateFilter;

      console.log(
        appointment.timedAt,
        new Date(Date.now()).toISOString().split("T")[0]
      );
      console.log(
        appointment.timedAt > new Date(Date.now()).toISOString().split("T")[0]
      );
      let status = "confirmed";
      if (appointment.timedAt > dateNow) {
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

      <div className="ApppointmentsShownPack">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="AppointmentsTable">
            <DataTable
              data={appointmentsforPatient}
              columns={appointmentsColumns}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Appointments;

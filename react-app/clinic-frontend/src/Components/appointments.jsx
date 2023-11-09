import React, { useState, useEffect } from "react";
import PackageCard from "../Elements/packageCard.jsx";
import "./appointments.css";
import DataTable from "../Elements/DataTable.jsx";
import "../Elements/DataTable.css";

const backendUrl = "http://localhost:4000";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true); // Add loading state

  const appointmentsforPatient = filteredAppointments.map((appointment, index) => ({
    date: new Date(appointment.timedAt).toDateString(),
    doctor: doctors[index] ? doctors[index].name : "N/A",
    speciality: doctors[index] ? doctors[index].speciality : "N/A",
    email: doctors[index] ? doctors[index].email : "N/A",
  }));

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
    setLoading(true); // Set loading to true when fetching starts
    // Fetch appointments data
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    fetch(`${backendUrl}/patients/getAppointments`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false); // Set loading to false on error
      });

    // Fetch doctors data
    fetch(`${backendUrl}/patients/patientdoctors`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.doctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  const filterAppointments = () => {
    const filteredAppointments = appointments.filter((appointment) => {
      const formattedAppointmentDate = new Date(appointment.timedAt)
        .toISOString()
        .split("T")[0];

      const dateFilterPassed =
        dateFilter === "" || formattedAppointmentDate === dateFilter;

      let status = "confirmed";
      if (appointment.timedAt > Date.now()) {
        status = "pending";
      }

      const statusFilterPassed =
        statusFilter === "all" || status === statusFilter;

      return dateFilterPassed && statusFilterPassed;
    });

    setFilteredAppointments(filteredAppointments);
  };

  return (
    <div className="Appointments-container">
      <h1>View Your Appointments</h1>
      <div className="Filter-container">
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
      </div>

    <div className="AppPack">
      {loading ? (
        <div className="loader"></div>
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

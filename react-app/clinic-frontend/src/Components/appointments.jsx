import React, { useState, useEffect } from 'react';
import PackageCard from '../Elements/packageCard.jsx'; // Adjust the path accordingly
import '../Elements/packageCard.css';

const backendUrl = 'http://localhost:4000';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    // Fetch appointments data
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    fetch(`${backendUrl}/patients/getAppointments`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);
      })
      .catch((error) => console.error('Error fetching appointments:', error));

    // Fetch doctors data
    fetch(`${backendUrl}/patients/patientdoctors`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.doctors);
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  };

  // Define the filterAppointments function to apply filters
  const filterAppointments = () => {
    const filteredAppointments = appointments.filter((appointment) => {
      const formattedAppointmentDate = new Date(appointment.timedAt)
        .toISOString()
        .split('T')[0]; // Convert to 'YYYY-MM-DD'

      // Check if the appointment date matches the date filter
      const dateFilterPassed =
        dateFilter === '' || formattedAppointmentDate === dateFilter;

      let status = 'confirmed';
      if (appointment.timedAt > Date.now()) {
        status = 'pending';
      }

      // Check if the appointment status matches the status filter
      const statusFilterPassed =
        statusFilter === 'all' || status === statusFilter;

      return dateFilterPassed && statusFilterPassed;
    });

    // Update the state with filtered appointments
    setFilteredAppointments(filteredAppointments);
  };

  const viewDoctorDetails = (doctor) => {
    // Your code to view doctor details
    console.log('View Doctor Details:', doctor);
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

      <div className="AppPack">
        {filteredAppointments.map((appointment, index) => (
          <PackageCard
            key={index}
            name="Appointment"
            details={[
              { label: <span style={{ fontWeight: 'bold' }}>Date: </span>, value: new Date(appointment.timedAt).toDateString() },
              { label: <span style={{ fontWeight: 'bold' }}>Doctor's Name: </span>, value: doctors[index] ? doctors[index].name : 'N/A' },
              { label: <span style={{ fontWeight: 'bold' }}>Doctor's Speciality: </span>, value: doctors[index] ? doctors[index].speciality : 'N/A' },
              { label: <span style={{ fontWeight: 'bold' }}>Doctor's Email: </span>, value: doctors[index] ? doctors[index].email : 'N/A' },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default Appointments;

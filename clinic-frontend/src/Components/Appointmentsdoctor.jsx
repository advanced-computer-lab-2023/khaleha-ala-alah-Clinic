import React, { useState, useEffect } from "react";
import styles from "./appointments.module.css";
import LoadingPage from "./LoadingPage.jsx";
import NavBar from "../Elements/NavBarDoctor.jsx";
import { DatePicker, Select } from "antd";
import { CalendarOutlined, FilterOutlined } from "@ant-design/icons"; // Import Ant Design icons
import Header from "../Elements/HeaderDoctor.jsx";
import Table from "./table.jsx";
import { useNavigate } from "react-router-dom";
import { Input, Button, Space, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import SearchOutlined
import Separator from "./separator";

const { RangePicker } = DatePicker;
const { Option } = Select;


const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);
  const [patients,setPatients]= useState([]);  
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  //Methods for forming the table

  
  const getPatientName = (appointment) => {
    const patient = patients.find(
      (patient) => patient.userID === appointment.PatientID
    );
    return patient ? patient.name : "N/A";
  };
  const getPatientEmail = (appointment) => {
    const patient = patients.find(
      (patient) => patient.userID === appointment.PatientID
    );
    return patient ? patient.email : "N/A";
  };
  
  const getPatientAge = (appointment) => {
    const patient = patients.find(
      (patient) => patient.userID === appointment.PatientID
    );
    return patient ? patient.age : "N/A";
  };

  const getPatientMobileNum = (appointment) => {
    const patient = patients.find(
      (patient) => patient.userID === appointment.PatientID
    );
    return patient ? patient.mobileNumber : "N/A";
  };

  const getPatientGender = (appointment) => {
    const patient = patients.find(
      (patient) => patient.userID === appointment.PatientID
    );
    return patient ? patient.gender : "N/A";
  };

  const appointmentsforDoctor = filteredAppointments.map(
    (appointment, index) => ({
      date: new Date(appointment.timedAt).toDateString(),
      patient: getPatientName(appointment),
      email: getPatientEmail(appointment),
      age: getPatientAge(appointment),
      gender: getPatientGender(appointment),
      mobilenum: getPatientMobileNum(appointment)
    })
  );

  
  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAppointments();
  }, []);

  // Function to fetch all appointments of a doctor
  const fetchAppointments = async () => {
    try {

      const response2 = await fetch(
        "http://localhost:4000/doctors",
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response2.ok) {
        console.log("laa");
        throw new Error("Failed to fetch appointments");
      }
      console.log("ewurew")
      const data2 = await response2.json();
      console.log(data2.patients);
      setPatients(data2.patients);

      const response = await fetch(
        "http://localhost:4000/doctors/appointments",
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      console.log(data);
      setAppointments(data.appointments);
      setFilteredAppointments(data.appointments);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const appointmentsColumns = [
    // Define columns similar to PatientsTable
    // Example column:
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => new Date(a.date) - new Date(b.date),

      // Add sorter or other properties as needed
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.doctor.localeCompare(b.doctor), // Sort alphabetically

      // Add sorter or other properties as needed
    },
    {
      title: "Patient Email",
      dataIndex: "email",
      key: "email",
      className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.email.localeCompare(b.email), // Sort alphabetically
    },
    {
      title: "Patient Age",
      dataIndex: "age",
      key: "age",
      className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.affiliation.localeCompare(b.affiliation), // Sort alphabetically
    },
    {
      title: "Patient Gender",
      dataIndex: "gender",
      key: "gender",
      className: styles.tableHeader, // Apply custom header style
    },
    {
      title: "Patient Mobile",
      dataIndex: "mobilenum",
      key: "mobilenum",
      className: styles.tableHeader, // Apply custom header style
    },
  ];

  // Function to filter appointments based on date and status
  // const filterAppointments = () => {
  //   const filtered = appointments.filter((appointment) => {
  //     const appointmentDate = new Date(appointment.timedAt)
  //       .toISOString()
  //       .split("T")[0];
  //     const status = appointment.timedAt > Date.now() ? "pending" : "confirmed";

  //     const dateFilterPassed =
  //       dateFilter === "" || appointmentDate === dateFilter;
  //     const statusFilterPassed =
  //       statusFilter === "all" ||
  //       status === statusFilter ||
  //       (statusFilter === "rescheduled" && appointment.isRescheduled) ||
  //       (statusFilter === "cancelled" && appointment.isCancelled);

  //     return dateFilterPassed && statusFilterPassed;
  //   });

  //   return filtered;
  // };

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
      console.log(statusFilter);
      // Check if the appointment status matches the status filter
      const statusFilterPassed =
        statusFilter === "all" ||
        status === statusFilter ||
        (statusFilter === "rescheduled" && appointment.isRescheduled) ||
        (statusFilter === "cancelled" && appointment.isCancelled);

      return dateFilterPassed && statusFilterPassed;
    });

    // Update the state with filtered appointments
    setFilteredAppointments(filteredAppointments);
  };

  const handleDateFilterChange = (dates) => {
    // Update dateFilter when the user selects a date range
    setDateFilter(dates);
    console.log(dates);
  };

  const handleStatusFilterChange = (value) => {
    // Update statusFilter when the user selects a status
    setStatusFilter(value);
  };


  return (
    // <div>
    //   <h2>Doctor Appointments</h2>
    //   {error && <p>Error: {error}</p>}
    //   <div>
    //     <label>Date Filter:</label>
    //     <input
    //       type="date"
    //       id="dateFilter"
    //       value={dateFilter}
    //       onChange={(e) => setDateFilter(e.target.value)}
    //     />
    //     <label>Status Filter:</label>
    //     <select
    //       id="statusFilter"
    //       value={statusFilter}
    //       onChange={(e) => setStatusFilter(e.target.value)}
    //     >
    //       <option value="all">All</option>
    //       <option value="confirmed">Confirmed</option>
    //       <option value="pending">Pending</option>
    //       <option value="rescheduled">Rescheduled</option>
    //       <option value="cancelled">Cancelled</option>
    //     </select>
    //   </div>
    //   <ul>
    //     {filterAppointments().map((appointment) => (
    //       <li key={appointment.id}>
    //         {new Date(appointment.timedAt).toLocaleString()}:{" "}
    //         {appointment.status}
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    
    <div className={styles.Container}>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <Header />
          <NavBar
            selectedSection={"appointments"}
            selectedSubSection="viewAppointments"
          />
          <div style={{ marginTop: "100px" }}> 
          <h1> View My Appointments </h1>
          <div>
          <Separator/>
            {/* <h1 style={{ marginTop: "34px", marginBottom: "10px" }}>
              View Your Appointments
            </h1> */}
            <div className={styles.Filters}>
              <RangePicker
                allowClear
                value={dateFilter}
                onChange={handleDateFilterChange}
                style={{ marginRight: "16px" }}
                suffixIcon={<CalendarOutlined />}
              />
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                style={{ width: "150px" }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All</Option>
                <Option value="confirmed">Finished</Option>
                <Option value="pending">Pending</Option>
                <Option value="rescheduled">Rescheduled</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
              <Button
                type="primary"
                onClick={filterAppointments}
                icon={<SearchOutlined />}
                style={{marginLeft:'1rem'}}
              >
                Filter
              </Button>
            </div>
            <div>
              <div style={{ width: 92 + "vw", marginTop: "10px" }}>
                <Table
                  data={appointmentsforDoctor}
                  columns={appointmentsColumns}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;

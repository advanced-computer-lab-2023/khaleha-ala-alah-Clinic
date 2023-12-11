import React, { useState, useEffect } from "react";
//import "./appointments.module.css";
import styles from "./appointments.module.css";

import Table from "./table.jsx";
import { useNavigate } from "react-router-dom";
import { Input, Button, Space, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import SearchOutlined
import Highlighter from "react-highlight-words";

import LoadingPage from "./LoadingPage.jsx";
import { useLayoutEffect } from "react";
import NavBar from "../Elements/NavBar.jsx";
import { DatePicker, Select } from "antd";
import { CalendarOutlined, FilterOutlined } from "@ant-design/icons"; // Import Ant Design icons
import Header from "../Elements/Header.jsx";

const { RangePicker } = DatePicker;
const { Option } = Select;

const backendUrl = "http://localhost:4000";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true); // Add loading state
  const [patientFamilyMember, setPatientFamilyMember] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const getDoctorName = (appointment) => {
    const doctor = doctors.find(
      (doctor) => doctor.userID === appointment.DoctorID
    );
    return doctor ? doctor.name : "N/A";
  };
  const getDoctorAffilation = (appointment) => {
    const doctor = doctors.find(
      (doctor) => doctor.userID === appointment.DoctorID
    );
    console.log(doctor);
    console.log("^^^^^ doctor");
    return doctor && doctor.affiliation
      ? doctor.affiliation
      : "Not Yet Available";
  };
  const getDoctorSpeciality = (appointment) => {
    const doctor = doctors.find(
      (doctor) => doctor.userID === appointment.DoctorID
    );
    return doctor ? doctor.speciality : "N/A";
  };
  const getDoctorEmail = (appointment) => {
    const doctor = doctors.find(
      (doctor) => doctor.userID === appointment.DoctorID
    );
    return doctor ? doctor.email : "N/A";
  };

  const appointmentsforPatient = filteredAppointments.map(
    (appointment, index) => ({
      date: new Date(appointment.timedAt).toDateString(),
      doctor: getDoctorName(appointment),
      speciality: getDoctorSpeciality(appointment),
      email: getDoctorEmail(appointment),
      affiliation: getDoctorAffilation(appointment),
    })
  );

  //const appointmentsColumns = [
  //  { key: "date", title: "Date" },
  // { key: "doctor", title: "Doctor" },
  // { key: "speciality", title: "Doctor's Speciality" },
  // { key: "email", title: "Doctor's Email" },
  //];

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

  const CustomHeader = ({ title }) => (
    <th style={{ backgroundColor: "blue", color: "white" }}>{title}</th>
  );

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
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.doctor.localeCompare(b.doctor), // Sort alphabetically

      // Add sorter or other properties as needed
    },
    {
      title: "Doctor Speciality",
      dataIndex: "speciality",
      key: "speciality",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Menu
            mode="vertical"
            selectedKeys={selectedKeys}
            multiple={true}
            onClick={(e) => {
              setSelectedKeys([e.key]);
              confirm();
            }}
          >
            <Menu.Item key="cardio">Cardio</Menu.Item>
            <Menu.Item key="dermatology">Dermatology</Menu.Item>
            <Menu.Item key="orthopedics">Orthopedics</Menu.Item>
            {/* Add more specialties as needed */}
          </Menu>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              setFilteredData([]); // Reset filtered data
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.speciality.toLowerCase().includes(value.toLowerCase()),
      render: (text) =>
        filteredData.length > 0 ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[filteredData]}
            autoEscape
            textToHighlight={text}
          />
        ) : (
          text
        ),
    },
    {
      title: "Doctor Email",
      dataIndex: "email",
      key: "email",
      className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.email.localeCompare(b.email), // Sort alphabetically
    },
    {
      title: "Doctor Affiliation",
      dataIndex: "affiliation",
      key: "affiliation",
      className: styles.tableHeader, // Apply custom header style
      sorter: (a, b) => a.affiliation.localeCompare(b.affiliation), // Sort alphabetically
    },
  ];

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
          <div style={{ marginTop: "93px" }}>
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
                  data={appointmentsforPatient}
                  columns={appointmentsColumns}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;

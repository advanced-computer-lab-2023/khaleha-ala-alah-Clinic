import React, { useState, useEffect } from "react";
import styles from "./appointments.module.css";
import LoadingPage from "./LoadingPage.jsx";
import NavBar from "../Elements/NavBarDoctor.jsx";
import { DatePicker, Select } from "antd";
import { CalendarOutlined, FilterOutlined } from "@ant-design/icons"; // Import Ant Design icons
import Header from "../Elements/HeaderDoctor.jsx";
import Table from "./table.jsx";
import { useNavigate } from "react-router-dom";
import { Input, Button, Space, Menu, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import SearchOutlined
import Separator from "./separator";
import RescheduleOverlay from "./rescheduleAppointment.jsx";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import axios from "axios";
import OptionIcon from "../Images/optionsIcon.png";

//import { set } from "../../../server/app.js";

const { RangePicker } = DatePicker;
const { Option } = Select;

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedappointment, setSelectedAppointment] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currDoctor, setCurrentDoctor] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

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

  const handleCancel = async () => {
    console.log(selectedappointment._id);
    try {
      // const formattedDateTime1 = selectedDateTime.replace("T", " ");
      // console.log(formattedDateTime1);
      console.log("ALO");
      const response = await axios.patch(
        `http://localhost:4000/doctors/cancelAppointment/${selectedappointment._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Specify the content type if needed
          },
        }
      );
      try{
        fetch('http://localhost:4000/notifications', {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          method: 'POST',
          body: JSON.stringify({
            title: "Appointment is cancelled",
            text: "You have an appointment cancelled at " + selectedappointment.timedAt,
            userID : selectedappointment.patientID,
          }),
        });
      }
      catch(error){
        console.error("notficaion is not saved yet", error);
      }


      //setStatusMessage(response.data.message);
    } catch (error) {
      //setStatusMessage(`Error scheduling follow-up: ${error.message}`);
      console.log(error);
    } finally {
      setShowConfirmationDialog(false);
    }
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
      appointment: appointment,
      date: new Date(appointment.timedAt).toDateString(),
      patient: getPatientName(appointment),
      email: getPatientEmail(appointment),
      age: getPatientAge(appointment),
      gender: getPatientGender(appointment),
      mobilenum: getPatientMobileNum(appointment),
    })
  );

  useEffect(() => {
    fetchAppointments();

    fetch("http://localhost:4000/doctors/getCurrDoc", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data.doctor);
        setCurrentDoctor(data.data.doctor);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [doctorId]);

  // Function to fetch all appointments of a doctor
  const fetchAppointments = async () => {
    try {
      const response2 = await fetch("http://localhost:4000/doctors", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response2.ok) {
        console.log("laa");
        throw new Error("Failed to fetch appointments");
      }
      console.log("ewurew");
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
  const handleAccept = (record) => {
    // Handle logic for accepting the appointment
    console.log(`Accept appointment with ID ${record.appointment.id}`);
    let token = localStorage.getItem("token");
    console.log(token);
    console.log(record.appointment);
    fetch(`http://localhost:4000/doctors/acceptFollowUpRequest`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        PatientID: record.appointment.PatientID,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Appointment accepted");
        } else {
          console.log("Appointment not accepted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRevoke = (record) => {
    // Handle logic for revoking the appointment
    let token = localStorage.getItem("token");
    console.log(token);
    console.log(record.appointment);
    fetch(`http://localhost:4000/doctors/revokeFollowUpRequest`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        PatientID: record.appointment.PatientID,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Appointment accepted");
        } else {
          console.log("Appointment not accepted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) =>
        record.appointment.isPending=== "True" ? (
          <>
            <Button className={styles.approveButton} style={{border: "2px solid blue", marginRight:"2px"}} onClick={() => handleAccept(record)}>Accept</Button>
            <Button className={styles.rejectButton} style={{border: "2px solid blue"}} onClick={() => handleRevoke(record)}>Revoke</Button>
          </>
        ) : null,
    },
    {
      title: "Action",
      key: "action",
      className: styles.tableHeader,
      render: (text, record) => (
        <div>
          <button
            className={styles.rescheduleButton}
            value={"approve"}
            onClick={() => {
              setSelectedPatient(record.patient);
              setSelectedAppointment(record.appointment);
              setShowOverlay(true);
            }}
          >
            Reschedule Appointment
          </button>

          <button
            className={styles.cancelButton}
            value={"approve"}
            onClick={() => {
              setSelectedPatient(record.patient);
              setSelectedAppointment(record.appointment);
              //setShowOverlay(true);
              setShowConfirmationDialog(true);
            }}
          >
            Cancel Appointment
          </button>
        </div>
      ),
    },
  ];

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
              <Separator />
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
                  style={{ marginLeft: "1rem" }}
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

      {showOverlay && (
        <RescheduleOverlay
          onCancel={() => setShowOverlay(false)}
          cancelLabel="Close"
          patient={selectedPatient}
          appointment={selectedappointment}
          doctor={currDoctor}
        />
      )}
      {showConfirmationDialog && (
        <ConfirmationDialog
          onCancel={() => setShowConfirmationDialog(false)}
          cancelLabel="Close"
          message={`Are you sure you want to cancel this appointment?`}
          onConfirm={handleCancel}
          confirmLabel="Cancel Appointment"
        />
      )}
    </div>
  );
};

export default DoctorAppointments;

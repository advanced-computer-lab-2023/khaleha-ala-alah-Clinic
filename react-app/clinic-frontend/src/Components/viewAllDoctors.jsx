import React, { useState, useEffect } from "react";
import Table from "./table.jsx";
import styles from "./allDoctors.module.css";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header";

const getSessionPrice = (doctor, currentPatient) => {
  // Replace this logic with your actual session price calculation
  // Here, I'm assuming session price is based on some fixed rate
  console.log(doctor.hourlyRate + "BBBB");
  let fixedSessionRate = doctor.hourlyRate + 0.1 * doctor.hourlyRate;
  console.log(fixedSessionRate + "AAAA");
  if (currentPatient.packageName && currentPatient.packageName != "none")
    fixedSessionRate =
      fixedSessionRate - currentPatient.doctorsDiscount * fixedSessionRate;
  console.log(fixedSessionRate);
  return fixedSessionRate;
};

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);

  useEffect(() => {
    // Function to fetch the list of doctors
    const fetchDoctors = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        const response = await fetch(
          "http://localhost:4000/doctors/Alldoctors",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctors(data.data.Doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Function to fetch the current patient's discounts
    const fetchPatientDiscounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/patients/currentPatient"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentPatient(data.data.user); // Adjust the data structure as needed
      } catch (error) {
        console.error("Error fetching patient discounts:", error);
      }
    };

    // Call the functions to fetch data when the component mounts
    fetchDoctors();
    fetchPatientDiscounts();
  }, []);
  const data = doctors.map((doctor, index) => ({
    Name: doctor.name,
    Speciality: doctor.speciality,
    SessionPrice: getSessionPrice(doctor, currentPatient),
    DrEmail: doctor.email,
  }));

  const columns = [
    // Define columns similar to PatientsTable
    // Example column:
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      className: styles.tableHeader,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      key: "speciality",
      className: styles.tableHeader,
    },
    {
      title: "Email",
      dataIndex: "DrEmail",
      key: "email",
      className: styles.tableHeader,
    },
    {
      title: "Session Price",
      dataIndex: "SessionPrice",
      key: "price",
      className: styles.tableHeader,
    },
  ];

  return (
    <div className={styles.AllDoctorsContainer}>
      <Header />
      <NavBar />
      <h2 className={styles.h1}>View All Doctors</h2>

      {/* Header Bar */}
      <div className={styles.headerBar}>
        <input
          type="text"
          className={`${styles.searchInput} ${styles.inputField}`}
          placeholder="Search by Name"
        />
        <input
          type="text"
          className={`${styles.searchInput} ${styles.inputField}`}
          placeholder="Search by Speciality"
        />
        <button className={styles.searchButton}>
          {" "}
          <SearchOutlined /> Search{" "}
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className={styles.headerBar2}>
        {/* Speciality Filter */}
        <select className={`${styles.filterSelect}`}>
          <option value="all">All Specialities</option>
          <option value="dermatologist">Dermatologist</option>
          <option value="cardiologist">Cardiologist</option>
        </select>

        {/* Day Filter */}
        <select className={`${styles.filterSelect}`}>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thuresday">Thuresday</option>
          <option value="Friday">Friday</option>
          <option value="All">All</option>
        </select>

        <select className={`${styles.filterSelect}`}>
          <option value="8">08:00 am</option>
          <option value="9">09:00 am</option>
          <option value="10">10:00 am</option>
          <option value="11">11:00 am</option>
          <option value="12">12:00 pm</option>
          <option value="1">01:00 pm</option>
          <option value="2">02:00 pm</option>
          <option value="3">03:00 pm</option>
          <option value="4">04:00 pm</option>
        </select>

        <button className={styles.searchButton}>
          <FilterOutlined style={{ marginRight: "4px" }} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default DoctorList;

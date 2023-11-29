import React, { useState, useEffect } from "react";
import Table from "./table.jsx";
import styles from "./allDoctors.module.css";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header";
import LoadingPage from "../Components/LoadingPage.jsx";
import { useNavigate } from "react-router-dom";

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
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearchValue, setNameSearchValue] = useState("");
  const [specialitySearchValue, setSpecialitySearchValue] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

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
        setSearchResults(data.data.Doctors);
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
    //setIsLoading(false);
  }, []);

  useEffect(() => {
    if (doctors.length > 0 && currentPatient != null) {
      fetchData();
    }
  }, [doctors, currentPatient]);
  const fetchData = () => {
    const data = searchResults.map((doctor, index) => ({
      doctor: doctor,
      Name: doctor.name,
      Speciality: doctor.speciality,
      SessionPrice: getSessionPrice(doctor, currentPatient),
      DrEmail: doctor.email,
    }));
    setTableData(data);
    setIsLoading(false);
  };

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

  const searchDoctor = () => {
    const doctorss = doctors.filter((doctor) => {
      return (
        (doctor.name.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
          nameSearchValue === "") &&
        (doctor.speciality
          .toLowerCase()
          .includes(specialitySearchValue.toLowerCase()) ||
          specialitySearchValue === "")
      );
    });

    setSearchResults(doctorss);
  };
  const handleFilterClick = () => {
    const filteredDoctors = searchResults.filter((doctor) => {
      console.log(specialityFilter.toLowerCase() + "<<<<<<< Speciality Filter");
      console.log(dayFilter + "<<<<<<< Day Filter");
      console.log(timeFilter + "<<<<<<< Time Filter");
      console.log(
        doctor.speciality.toLowerCase() + "<<<<<<< Doctor Speciality"
      );
      const specialityMatch =
        specialityFilter.toLowerCase() === "all" ||
        specialityFilter === "" ||
        doctor.speciality.toLowerCase() === specialityFilter.toLowerCase();
      const dayMatch =
        dayFilter.toLowerCase() === "all" ||
        dayFilter === "" ||
        doctorHasAvailability(doctor, dayFilter, timeFilter);
      console.log(specialityMatch);
      console.log(dayMatch);
      return specialityMatch && dayMatch;
    });

    setSearchResults(filteredDoctors);
  };

  const doctorHasAvailability = (doctor, day, time) => {
    return doctor.fixedSlots.some(
      (slot) => slot.day === day && slot.hour === time
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className={styles.AllDoctorsContainer}>
          <Header />
          <NavBar selectedSection={"viewAllDoctors"} />
          <h2 className={styles.h1}>View All Doctors</h2>

          {/* Header Bar */}
          <div className={styles.headerBar}>
            <input
              type="text"
              className={`${styles.searchInput} ${styles.inputField}`}
              placeholder="Search by Name"
              id="nameSearch"
              value={nameSearchValue}
              onChange={(e) => setNameSearchValue(e.target.value)}
            />
            <input
              type="text"
              className={`${styles.searchInput} ${styles.inputField}`}
              placeholder="Search by Speciality"
              id="specialitySearch"
              value={specialitySearchValue}
              onChange={(e) => setSpecialitySearchValue(e.target.value)}
            />
            <button className={styles.searchButton} onClick={searchDoctor}>
              {" "}
              <SearchOutlined /> Search{" "}
            </button>
          </div>

          {/* Filter Dropdowns */}
          <div className={styles.headerBar2}>
            {/* Speciality Filter */}
            <select
              className={`${styles.filterSelect}`}
              id="specialityFilter"
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
            >
              <option value="all">All Specialities</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="cardiology">Cardiologist</option>
            </select>

            {/* Day Filter */}
            <select
              className={`${styles.filterSelect}`}
              id="dayFilter"
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
            >
              <option value="all">ALL</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thuresday">Thuresday</option>
              <option value="Friday">Friday</option>
            </select>

            <select
              className={`${styles.filterSelect}`}
              id="timeFilter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">ALL</option>
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

            <button
              className={styles.searchButton}
              onClick={handleFilterClick}
              id="filterButton"
            >
              <FilterOutlined style={{ marginRight: "4px" }} />
              Filter
            </button>
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <Table
              data={tableData}
              columns={columns}
              clickable={true}
              onRowClick={(record, rowIndex) => {
                navigate("/bookAppointment", {
                  state: { doctor: record.doctor },
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorList;

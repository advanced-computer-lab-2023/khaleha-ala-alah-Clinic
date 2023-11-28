import React, { useState, useEffect } from "react";
import Table from "./table.jsx";
import OverlayWindow from "./overlayWindow.jsx";
import Header from "../Elements/Header.jsx";
import NavBar from "../Elements/NavBar.jsx";
import LoadingPage from "./LoadingPage.jsx";
import styles from "./prescriptions.module.css";
import { FilterOutlined } from "@ant-design/icons";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [filledFilter, setFilledFilter] = useState("all");
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [message, setMessage] = useState("");
  const [tableData, setTableData] = useState([]);

  // Similar to componentDidMount, fetch data when the component mounts
  useEffect(() => {
    fetchPrescriptions();
    // Removed call to fetchData here
  }, []);

  useEffect(() => {
    if (prescriptions.length > 0 && doctors.length > 0) {
      fetchData();
    }
  }, [prescriptions, doctors]);
  // Function to fetch prescriptions
  const fetchPrescriptions = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // Fetch prescriptions data from your API
    fetch("http://localhost:4000/patients/persecriptions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data.data.prescriptions);
        setFilteredPrescriptions(data.data.prescriptions);
        fetchDoctors();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // Function to fetch doctor data
  const fetchDoctors = () => {
    // Fetch doctor data from your API
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch("http://localhost:4000/doctors/Alldoctors", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.data.Doctors);
        //fetchData();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  function viewPrescriptionDetails(prescriptionLocation, DoctorID, isFilled) {
    // Your function logic here
    // For example, show a modal or navigate to a details page
    const doctor = doctors.find((doc) => doc.userID === DoctorID);
    const isPrescriptionFilled = true;
    console.log(typeof isFilled);
    if (isFilled == "false") isPrescriptionFilled = false;

    console.log(isPrescriptionFilled);
    alert(
      `More Info About this prescription: 
    Location: ${prescriptionLocation}
    Prescription filled status: ${isFilled ? "Filled" : "Unfilled"}
    Doctor Name: ${doctor.name}
    Doctor Email: ${doctor.email}
    Doctor Speciality: ${doctor.speciality}`
    );
  }
  // Function to handle filter changes
  const handleFilterChange = () => {
    // Implement filter logic here and update the filteredPrescriptions state
    const filtered = prescriptions.filter((prescription) => {
      let doctor = null;
      for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].userID == prescription.DoctorID) {
          doctor = doctors[i];
          break;
        }
      }
      const dateMatch = dateFilter === "" || prescription.date === dateFilter;
      const doctorMatch =
        doctorFilter === "" ||
        (doctor && doctor.name.toLowerCase().includes(doctorFilter));
      const filledMatch =
        filledFilter === "all" ||
        (filledFilter === "filled" && prescription.isFilled) ||
        (filledFilter === "unfilled" && !prescription.isFilled);
      return dateMatch && doctorMatch && filledMatch;
    });

    setFilteredPrescriptions(filtered);
  };

  const columns = [
    {
      title: "Issue Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Doctor Email",
      dataIndex: "doctorEmail",
      key: "doctorEmail",
    },
    {
      title: "Doctor Speciality",
      dataIndex: "doctorSpeciality",
      key: "doctorSpeciality",
    },
    {
      title: "Prescription Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];

  const fetchData = () => {
    const data = filteredPrescriptions.map((prescription, index) => ({
      summary: prescription.summary,
      location: prescription.location,
      status: prescription.isFilled ? "Filled" : "Unfilled",
      doctorName: doctors.find((doc) => doc.userID === prescription.DoctorID)
        ? doctors.find((doc) => doc.userID === prescription.DoctorID).name
        : "Not Found",
      doctorEmail: doctors.find((doc) => doc.userID === prescription.DoctorID)
        ? doctors.find((doc) => doc.userID === prescription.DoctorID).email
        : "Not Found",
      doctorSpeciality: doctors.find(
        (doc) => doc.userID === prescription.DoctorID
      )
        ? doctors.find((doc) => doc.userID === prescription.DoctorID).speciality
        : "Not Found",
      date: new Date(prescription.date).toDateString(),
    }));
    setTableData(data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <Header />
          <NavBar selectedSection={"prescriptions"} />
          <div className={styles.titleContainer}>
            <h1>Prescriptions</h1>
            <p>
              View Your Prescriptions And Filter Them Using Date Of Issuing,
              Doctor Name Or/And Status
            </p>
          </div>

          <div className={styles.tableContainer}>
            <div className={styles.filterContainer}>
              {/* Filter options */}
              <input
                type="date"
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`${styles.searchInput} ${styles.inputField}`}
              />

              <input
                type="text"
                id="doctorFilter"
                placeholder="Enter doctor's name"
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className={`${styles.searchInput} ${styles.inputField}`}
              />

              <select
                id="filledFilter"
                value={filledFilter}
                onChange={(e) => setFilledFilter(e.target.value)}
                className={`${styles.searchInput} ${styles.inputField}`}
              >
                <option value="all">Filled/Unfilled</option>
                <option value="filled">Filled</option>
                <option value="unfilled">Unfilled</option>
              </select>

              <button
                onClick={handleFilterChange}
                className={styles.searchButton}
              >
                <FilterOutlined style={{ marginRight: "4px" }} />
                Apply Filter
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>Click On Any Row To Show Prescription Summary</p>
              <Table
                data={tableData}
                columns={columns}
                clickable={true}
                onRowClick={(record, rowIndex) => {
                  setMessage(record.summary);
                  setShowOverlay(true);
                }}
              />
            </div>
          </div>

          {showOverlay && (
            <OverlayWindow
              message={message}
              onCancel={() => setShowOverlay(false)}
              cancelLabel="Close"
            />
          )}
        </div>
      )}
    </>
  );
}

export default Prescriptions;

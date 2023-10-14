import React, { useState, useEffect } from "react";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [filledFilter, setFilledFilter] = useState("all");
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount, fetch data when the component mounts
  useEffect(() => {
    fetchPrescriptions();
    fetchDoctors();
  }, []);

  // Function to fetch prescriptions
  const fetchPrescriptions = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "authorization": "Bearer " + localStorage.getItem("token")
      },
    };
    // Fetch prescriptions data from your API
    fetch("http://localhost:4000/patients/persecriptions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data.data.prescriptions);
        setFilteredPrescriptions(data.data.prescriptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  };

  // Function to fetch doctor data
  const fetchDoctors = () => {
    // Fetch doctor data from your API
    const requestOptions = {
      method: 'GET',
      headers: {
        "authorization": "Bearer " + localStorage.getItem("token")
      },
    };
    fetch("http://localhost:4000/doctors/Alldoctors", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.data.Doctors);
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

  return (
    <div>
      <h1>Prescriptions</h1>
      {/* Filter options */}
      <label htmlFor="dateFilter">Filter by Date:</label>
      <input
        type="date"
        id="dateFilter"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <label htmlFor="doctorFilter">Filter by Doctor:</label>
      <input
        type="text"
        id="doctorFilter"
        placeholder="Enter doctor's name"
        value={doctorFilter}
        onChange={(e) => setDoctorFilter(e.target.value)}
      />

      <label htmlFor="filledFilter">Filter by Filled/Unfilled:</label>
      <select
        id="filledFilter"
        value={filledFilter}
        onChange={(e) => setFilledFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="filled">Filled</option>
        <option value="unfilled">Unfilled</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filter</button>

      <ul id="prescriptionList">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPrescriptions.map((prescription, index) => (
            <li key={index}>
              <div>
                <p>Summary: {prescription.summary}</p>
                <button
                  onClick={() =>
                    viewPrescriptionDetails(
                      prescription.location,
                      prescription.DoctorID,
                      prescription.isFilled
                    )
                  }
                >
                  Select (View Details)
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Prescriptions;

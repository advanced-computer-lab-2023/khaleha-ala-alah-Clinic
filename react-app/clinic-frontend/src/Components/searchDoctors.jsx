import React, { useState, useEffect } from "react";
import PackageCard from "../Elements/packageCard.jsx"; // Adjust the path accordingly
import "../Elements/packageCard.css";
import { useNavigate } from "react-router-dom";

const DoctorSearch = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearchValue, setNameSearchValue] = useState("");
  const [specialitySearchValue, setSpecialitySearchValue] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const navigate = useNavigate();

  const navigateToBook = (doctor) => {
    navigate("/bookAppointment", { state: { doctor } });
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    fetch("http://localhost:4000/doctors/Alldoctors", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllDoctors(data.data.Doctors);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const searchDoctor = () => {
    const doctors = allDoctors.filter((doctor) => {
      return (
        (doctor.name.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
          nameSearchValue === "") &&
        (doctor.speciality
          .toLowerCase()
          .includes(specialitySearchValue.toLowerCase()) ||
          specialitySearchValue === "")
      );
    });

    setSearchResults(doctors);
  };

  const viewDoctorDetails = (doctor) => {
    alert(
      `Doctor Name: ${doctor.name}\nDoctor Speciality: ${doctor.speciality}\nDoctor Email: ${doctor.email}\nDoctor Gender: ${doctor.gender}\nDoctor Affiliation: ${doctor.affiliation}\nDoctor Educational Background: ${doctor.educationalBackground}`
    );
  };

  const handleFilterClick = () => {
    const filteredDoctors = searchResults.filter((doctor) => {
      const specialityMatch =
        specialityFilter === "all" ||
        specialityFilter === "" ||
        doctor.speciality === specialityFilter;
      const dayMatch =
        dayFilter === "all" ||
        dayFilter === "" ||
        doctorHasAvailability(doctor, dayFilter, timeFilter);
      console.log(specialityFilter);
      console.log(dayFilter);
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
      <div>
        <label htmlFor="nameSearch">Search by Doctor Name:</label>
        <input
          type="text"
          id="nameSearch"
          placeholder="Enter doctor name"
          value={nameSearchValue}
          onChange={(e) => setNameSearchValue(e.target.value)}
        />

        <label htmlFor="specialitySearch">Search by Doctor Speciality:</label>
        <input
          type="text"
          id="specialitySearch"
          placeholder="Enter doctor Speciality"
          value={specialitySearchValue}
          onChange={(e) => setSpecialitySearchValue(e.target.value)}
        />
        <button onClick={searchDoctor}>SEARCH</button>
        <h1>Filter Doctors</h1>
        <label htmlFor="specialityFilter">Speciality:</label>
        <select
          id="specialityFilter"
          value={specialityFilter}
          onChange={(e) => setSpecialityFilter(e.target.value)}
        >
          <option value="">ALL</option>
          <option value="Cardiology">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>

        <label htmlFor="dayFilter">Day:</label>
        <select
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
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>

        <label htmlFor="timeFilter">Time:</label>
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">ALL</option>
          <option value="08:00 AM">08:00 AM</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="01:00 PM">01:00 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
        </select>

        <button onClick={handleFilterClick} id="filterButton">
          Filter
        </button>
      </div>
      <div className="AppSearch">
        {searchResults.map((doctor, index) => (
          <PackageCard
            key={index}
            name="Doctor"
            details={[
              { label: "Name", value: doctor.name },
              { label: "Doctor's Speciality", value: doctor.speciality },
              // Add other details as needed
            ]}
            buttonsDetails={[
              {
                text: "View Details",
                onClick: () => {
                  console.log(doctor);
                  console.log("----------------------------------------");
                  navigateToBook(doctor);
                },
              },
              // Add other buttons as needed
            ]}
          />
        ))}
      </div>
    </>
  );
};

export default DoctorSearch;

import React, { useState, useEffect } from "react";

const DoctorSearch = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearchValue, setNameSearchValue] = useState("");
  const [specialitySearchValue, setSpecialitySearchValue] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
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
      `Doctor Name: ${doctor.name} \nDoctor Speciality: ${doctor.speciality} \nDoctor Email: ${doctor.email}\nDoctor Affiliation : ${doctor.affiliation} \nDoctor Educational Background: ${doctor.educationalBackground}`
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
      console.log(dayFilter);
      return specialityMatch && dayMatch;
    });

    setSearchResults(filteredDoctors);
  };

  const doctorHasAvailability = (doctor, day, time) => {
    return doctor.fixedSlots.some((slot) => {
      return (
        slot.day &&
        day &&
        slot.day.toLowerCase() === day.toLowerCase() &&
        (slot.hour === time || time === "all" || time === "")
      );
    });
  };

  return (
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
        <option value="Dermatology">Dermatologist</option>
      </select>

      <label htmlFor="dayFilter">Day:</label>
      <select
        id="dayFilter"
        value={dayFilter}
        onChange={(e) => setDayFilter(e.target.value)}
      >
        <option value="all">ALL</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
      </select>

      <label htmlFor="timeFilter">Time:</label>
      <select
        id="timeFilter"
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
      >
        <option value="all">ALL</option>
        <option value="8:00 AM">8:00 AM</option>
        <option value="8:30 AM">8:30 AM</option>
        <option value="9:00 AM">9:00 AM</option>
      </select>

      <button onClick={handleFilterClick} id="filterButton">
        Filter
      </button>
      <ul>
        {searchResults.map((doctor) => (
          <li key={doctor.id}>
            <div>
              <p>Name: {doctor.name}</p>
              <p>Speciality: {doctor.speciality}</p>
              <button onClick={() => viewDoctorDetails(doctor)}>
                View Doctor Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSearch;

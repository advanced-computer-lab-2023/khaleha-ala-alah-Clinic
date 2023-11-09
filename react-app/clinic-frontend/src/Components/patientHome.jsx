import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import sidebarUserImage from "../Images/sidebarUser.png"; // Import the user photo
import SidebarImage from "../Images/adham.jpg"; // Import the user photo
import { useState } from "react";
import appointmentsimg from "../Images/appointmentpatient.png";
import perscriptionimg from "../Images/perscriptionpatient.png";
import addfamilyimg from "../Images/addfmpatient.png";
import viewdoctors from "../Images/viewdoctorpatient.png";
import searchdoctor from "../Images/searchdoctor.png";
import familymember from "../Images/fammember.png";


export const PatientHome = () => {
  const logut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };

  const [activeButton, setActiveButton] = useState(null);

  
  const linkButtonStyle = {
    textDecoration: 'none', // Remove underline
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <img src={sidebarUserImage} alt="User" className="user-photo" />
        <div className="user-info">
          <p className="user-name">Adham</p>
          <p className="user-email">adham@gmail.com</p>
        </div>
      </div>
      <hr className="separator" />
      <div className="buttons-container">
        <Link
          to="/appointments"
          style={linkButtonStyle}
          className={`sidebar-button ${
            activeButton === "Appointments" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Appointments")}
        >
        <img src={appointmentsimg} alt="Appointments" />
          Appointments
        </Link>

        <Link
          to="/prescriptions"
          style={linkButtonStyle}
          className={`sidebar-button ${
            activeButton === "Prescriptions" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Prescriptions")}
        >
          <img src={perscriptionimg} alt="Perscriptions" />
          Prescriptions
        </Link>

        <Link
          to="/familyMembers"
          style={linkButtonStyle}
          className={`sidebar-button ${
            activeButton === "FamilyMembers" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("FamilyMembers")}
        >
          <img src={familymember} alt="FamilyMember" />
          Family Members
        </Link>

        <Link
          to="/registerFamilyMember"
          style={linkButtonStyle}
          className={`sidebar-button ${
            activeButton === "RegisterFamilyMember" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("RegisterFamilyMember")}
        >
          <img src={addfamilyimg} alt="Add" />
          Add Family Members
        </Link>

        <Link
          to="/searchDoctors"
          style={linkButtonStyle}
          className={`sidebar-button ${
            activeButton === "SearchDoctors" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("SearchDoctors")}
        >
          <img src={searchdoctor} alt="SearchDoctors" />
          Search Doctors
        </Link>

        <Link
          to="/viewAllDoctors"
          style={linkButtonStyle}
          className={`sidebar-button ${
            activeButton === "ViewAllDoctors" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("ViewAllDoctors")}
        >
            <img src={viewdoctors} alt="ViewAllDoctors" />
          View All Doctors
        </Link>

        {/* You can add more buttons following the same pattern */}
      </div>
      <div className="background-overlay"></div>
        <img src={SidebarImage} alt="Background" className="background-image" />
    </div>
  );
};

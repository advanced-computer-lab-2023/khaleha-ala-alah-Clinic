import React from "react";
import "./patient.css";
import { Link } from "react-router-dom";


export const DoctorHome = () => {
    return(
        <div className="doctorHome">
            <div>
      {/* Navigation Bar */}
      

      {/* Profile Side Menu */}
      <div className="profile-menu" id="profileMenu">
        <a href="#">Edit My Profile</a>
        <a href="#">Log Out</a>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-buttons">
            <Link to="/editDoctorProfile" className="sidebar-button">
                edit profile
            </Link>
            <Link to="/doctorAppointments" className="sidebar-button">
                Appointments
            </Link>
            <Link to="/patientdoctorhealth" className="sidebar-button">
                patient health
            </Link>
            <Link to="/viewallmypatients" className="sidebar-button">
                view my patients
            </Link>
            <Link to="/follow-up-scheduler" className="sidebar-button">
                schedule a follow up
            </Link>
        </div>
      </div>
    </div>
        </div>
    );
};
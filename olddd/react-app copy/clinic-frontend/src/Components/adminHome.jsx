import React from "react";
import "./patient.css";
import { Link } from "react-router-dom";

export const AdminHome = () => {
    return(
        <div className="adminHome">
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
            <Link to="/addAdmin" className="sidebar-button">
                add admin
            </Link>
            <Link to="/deleteAdminDoctorPatient" className="sidebar-button">
                delete admin/doctor/patient
            </Link>
            <Link to="/viewPendingDoctors" className="sidebar-button">
                view pending doctors
            </Link>
            <Link to="/packages" className="sidebar-button">
                packages
            </Link>
        </div>
      </div>
    </div>
        </div>
    );
};
import React from "react";
//import "./patient.css";
//import "./patientHome.css";
import { Link } from "react-router-dom";

import pres from "../Images/perscriptionpatient.png";
import viewdoctor from "../Images/viewdoctorpatient.png";
import searchdoctor from "../Images/searchdoctor.png";
import healthpackages from "../Images/packages.png";

import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBar";

export const AdminHome = () => {
 
  return (
    <div style={{ backgroundColor: "white", height: "100vh", width: "99.9vw" }}>
      <NavBar />
      <div className="all-containers">
        {/* Profile Side Menu */}

        {/* Sidebar */}
        <div
          className="services-container"
          style={{ justifyContent: "flex-start", margin: "20px 0 0 20px" }}
        >
          <ServiceItem
            imgSrc={searchdoctor}
            title="Add new admin"
            description="Here you can add new admin"
            navigateTo="/addAdmin"
          />
          ,
          <ServiceItem
            imgSrc={viewdoctor}
            title="delete admin/doctor/patient"
            description="Explore profiles and expertise of all our available users"
            navigateTo="/deleteAdminDoctorPatient"
          />
          ,
          <ServiceItem
            imgSrc={viewdoctor}
            title="User Management"
            description="Manage All Users"
            navigateTo="/ManagementOfUsers"
          />
          ,
          <ServiceItem
            imgSrc={pres}
            title="View Pending Doctors"
            description="Show your medications prescribed online quickly and securely"
            navigateTo="/viewPendingDoctors"
          />
          ,
          <ServiceItem
            imgSrc={healthpackages}
            title="Health Packages"
            description="Manage our system health plans for comprehensive care solutions"
            navigateTo="/packages"
          />
        </div>
      </div>
    </div>
  );
};

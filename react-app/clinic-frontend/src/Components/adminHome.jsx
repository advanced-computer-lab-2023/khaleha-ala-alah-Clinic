import React from "react";
//import "./patient.css";
//import "./patientHome.css";
import { Link } from "react-router-dom";

import makeappointment from "../Images/appointmentpatient.png";
import pres from "../Images/perscriptionpatient.png";
import addfm from "../Images/addfmpatient.png";
import viewdoctor from "../Images/viewdoctorpatient.png";
import searchdoctor from "../Images/searchdoctor.png";
import viewfm from "../Images/fammember.png";
import healthpackages from "../Images/packages.png";
import chatdoctor from "../Images/chat.png";
import familymember from "../Images/FamilyMember.jpg";
import appointments from "../Images/appointments.jpg";
import packages from "../Images/Packages.jpg";
import doctors from "../Images/SearchDoctor.jpg";

import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBar";
import ImageCarousel from "../Elements/ImageCarousel";

export const AdminHome = () => {
  const slides = [
    {
      image: familymember,
      title: "Choose your Doctor",
      description:
        "Explore our diverse range of expert doctors and select the one who best suits your healthcare needs.",
    },
    {
      image: doctors,
      title: "Family Members",
      description:
        " Easily add family members to your account, and Experience personalized care for the whole family, all in one place.",
    },
  ];
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
            imgSrc={pres}
            title="View Pending Doctors"
            description="Show your medications prescribed online quickly and securely"
            navigateTo="/viewPendingDoctors"
          />
          ,
          <ServiceItem
            imgSrc={makeappointment}
            title="Make Appointments"
            description="Schedule a consultation with your preferred doctor anytime"
            navigateTo="/appointments"
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

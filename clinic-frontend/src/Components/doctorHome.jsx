import React from "react";
import { Link } from "react-router-dom";
import "../Components/doctorHome.css";
import { useState } from "react";
import ServiceInfo from "./infoWindow.jsx"

import makeappointment from "../Images/appointmentpatient.png";
import chatpatient from "../Images/chat.png";
import healthrecord from "../Images/record.png";
import allpatients from "../Images/viewallpatients.png";
import follow from "../Images/followup.png";

import ImageCarousel from "../Elements/ImageCarouselDr";
import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBarDoctor";
import Header from "../Elements/HeaderDoctor";

import appointments from "../Images/appointmentsDrr.jpg";
import chat from "../Images/chat.jpg";
import patientrecord from "../Images/healthrecords.jpg";
import viewpatient from "../Images/patients.jpg";
import manageprescrip from "../Images/prescriptions.jpg";


export const DoctorHome = () => {

  const [showOverlay , setShowOverlay ] = useState(false);
  const [serviceItemName , setServiceItemName] = useState("");
  const [serviceItemDescription , setServiceItemDescription] = useState("");
  const slides = [
    {
      image: viewpatient,
      title: "view my Patients",
      description:
        "Effortlessly track and manage your patient list with our comprehensive patient overview feature, all in one place.",
    },
    {
      image: appointments,
      title: "Manage Appointments",
      description:
        "Experience the ease of effortless appointment booking and simple follow-ups with your patients.",
    },
    {
      image: patientrecord,
      title: "Health Records",
      description:
        "Instantly access and update patient health records, ensuring accurate and up-to-date medical information.",
    },
    {
      image: manageprescrip,
      title: "Manage Prescriptions",
      description:
        "Streamline patient care with the ability to add, update, and delete prescriptions, including detailed medicine types and dosages",
    },
    {
      image: chat,
      title: "Chat with your Patient",
      description:
        "Get immediate access to your patient with our easy-to-use chat feature. Send your personalized care anytime to your patients",
    },

    // Add more slides as needed
  ];

    
  const handleClickDetails = (title , description) => {
    console.log(title , description);
    setServiceItemName(title);
    setServiceItemDescription(description);
    setShowOverlay (true);
  };


  return (
    <div>
      <Header />
      <NavBar />
      {
        <div className="all-containers-doctorH">
          <div className="carousel-container-doctorH">
            <ImageCarousel slides={slides} />
          </div>

          <div className="titleofPAGE-doctorH">
            <h1> To cure sometimes, to relieve often, to comfort always. </h1>
          </div>
          <div className="services-container-doctorH">
            <ServiceItem
              imgSrc={allpatients}
              title="View My Patients"
              description="Explore profiles and expertise of all your patients"
              method= {handleClickDetails}
              message= "Explore profiles and health records of your patients. Manage health records, schedule follow-ups, view prescriptions, and add new prescriptions for each patient."
            />
            ,
            <ServiceItem
              imgSrc={makeappointment}
              title="Manage Appointments"
              description="Schedule a consultation with your patients anytime"
              method= {handleClickDetails}
              message= "View and manage your patients' appointments. Accept, revoke, or reschedule appointments to schedule consultations with your patients at your convenience."            />
            ,
            <ServiceItem
              imgSrc={healthrecord}
              title="Patient Health Records"
              description="view and manage detailed health records of your patients"
              method= {handleClickDetails}
              message= "Effortlessly access and oversee comprehensive health records for your patients. Manage and review detailed health information to provide the best possible care."            />
            ,
            <ServiceItem
              imgSrc={makeappointment}
              title="add available slots"
              description="Seamlessly manage your schedule by updating available slots"
              method= {handleClickDetails}
              message= "Easily enhance your appointment schedule by adding available slots to your calendar. Streamline your availability for patients with ease."           />
            ,
            <ServiceItem
              imgSrc={chatpatient}
              title="Chat with Patient"
              description="connect with your patient through secure in-app messaging"
              method= {handleClickDetails}
              message= "Stay in touch and communicate securely with your patients through our convenient in-app messaging system. Enhance patient-doctor communication effortlessly."
            />
          </div>
          <div className="about-us-container">
      <h2>About Us</h2>
      <p style={{
          padding: '2rem',
          marginLeft: '3rem',
          fontSize: '16pt',
          lineHeight: 1.6,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold'
        }}>
          At Khaleha-ala-allah Clinic, we are dedicated to providing exceptional healthcare services tailored to meet the unique needs of our patients.
          With a commitment to excellence and a passion for wellness, our team of experienced healthcare professionals strives to 
          deliver compassionate and comprehensive medical care.
        </p>
        <p style={{
          marginTop: '2rem',
          fontSize: '14pt',
          lineHeight: 1.6,
          fontFamily: 'Arial, sans-serif'
        }}>
          From routine check-ups to specialized medical services, we offer a range of healthcare solutions designed to promote a lifetime of optimal health. We look forward to serving you and your family with the highest standards of medical excellence.
        </p>
    </div>
        </div>
      }

        {showOverlay && (
            <ServiceInfo
              title={serviceItemName}
              message={serviceItemDescription}
              onCancel={() => {
                setShowOverlay(false);
              }}
              cancelLabel={"Close"}
            />
          )}
    </div>
  );
};

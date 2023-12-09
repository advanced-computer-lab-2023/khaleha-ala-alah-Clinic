import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
//import "./patientHome.css";
import styles from "./patientHome.module.css";

import makeappointment from "../Images/appointmentpatient.png";
import pres from "../Images/perscriptionpatient.png";
import addfm from "../Images/addfmpatient.png";
import viewdoctor from "../Images/viewdoctorpatient.png";
import searchdoctor from "../Images/searchdoctor.png";
import viewfm from "../Images/fammember.png";
import healthpackages from "../Images/packages.png";
import chatdoctor from "../Images/chat.png";

import ImageCarousel from "../Elements/ImageCarousel";
import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBar";
import LoadingPage from "./LoadingPage.jsx";
import Header from "../Elements/Header";

import familymember from "../Images/FamilyMember.jpg";
import appointments from "../Images/appointments.jpg";
import packages from "../Images/Packages.jpg";
import doctors from "../Images/SearchDoctor.jpg";
import chat from "../Images/VideoChat.jpg";
import medicine from "../Images/BuyMedicine.jpg";

import { useEffect } from "react";
import axios from "axios";
import Wallet from "./Wallet.js";

import ServiceInfo from "./infoWindow.jsx"
import { message } from "antd";

export const PatientHome = () => {
  const logut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [currentPatient, setCurrentPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay , setShowOverlay ] = useState(false);
  const [serviceItemName , setServiceItemName] = useState("");
  const [serviceItemDescription , setServiceItemDescription] = useState("");

  useEffect(() => {
    const getCurrentPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/patients/currentPatient",
          {
            headers: {
              // Assuming you're sending the token for authentication
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCurrentPatient(response.data.data.user);
      } catch (error) {
        console.error("Error fetching current patient", error);
        // Handle error...
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentPatient();
  }, []);
  const handleButtonClick = (buttonName) => {
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };

  const [activeButton, setActiveButton] = useState(null);

  const slides = [
    {
      image: doctors,
      title: "Choose your Doctor",
      description:
        "Explore our diverse range of expert doctors and select the one who best suits your healthcare needs.",
    },
    {
      image: familymember,
      title: "Family Members",
      description:
        " Easily add family members to your account, and Experience personalized care for the whole family, all in one place.",
    },
    {
      image: appointments,
      title: "make Appointments",
      description:
        "Experience the ease of effortless appointment booking and simple follow-ups with your chosen healthcare professional.",
    },
    {
      image: packages,
      title: "Health Packages",
      description:
        "Discover our range of tailored health packages, designed to cater to your unique health needs.",
    },
    {
      image: medicine,
      title: "Buy Medicines",
      description:
        "Easily buy your medicines through our app. Simple, quick, and convenient – your health essentials delivered to your doorstep.",
    },
    {
      image: chat,
      title: "Chat with your Doctor",
      description:
        "Get immediate access to your doctor with our easy-to-use chat feature. Ask questions, seek advice, and receive personalized care anytime. SOON",
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
    <div className={styles.patientHomeContainer}>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div>
          <Header />
          <NavBar selectedSection="home" />
          {
            <div className={styles.allContainers}>
              <div className={styles.carouselContainer}>
                <ImageCarousel slides={slides} />
              </div>

              <div className={styles.titleofPAGE} style={{ marginTop: "0px" }}>
                <h1> Discover our comprehensive healthcare services </h1>
              </div>
              <div className={styles.servicesContainer}>
                <ServiceItem
                  imgSrc={viewdoctor}
                  title="View and Search all Doctors"
                  description="Explore profiles and expertise of our medical staff"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
                <ServiceItem
                  imgSrc={pres}
                  title="Prescriptions"
                  description="Show your medications prescribed online quickly and securely"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
                <ServiceItem
                  imgSrc={makeappointment}
                  title="View Appointments"
                  description="View a scheduled consultation with your preferred doctor anytime"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
                <ServiceItem
                  imgSrc={healthpackages}
                  title="Health Packages"
                  description="Choose from tailored health plans for comprehensive care solutions"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
                <ServiceItem
                  imgSrc={viewfm}
                  title="Family Members"
                  description="Access and manage your family's health profiles all in one place"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
                <ServiceItem
                  imgSrc={addfm}
                  title="Add Family Member"
                  description="Expand your care circle by adding family members"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
                <ServiceItem
                  imgSrc={chatdoctor}
                  title="Chat with Doctor"
                  description="connect with our doctors through secure in-app messaging"
                  method= {handleClickDetails}
                  message= ""
                />
                ,
              </div>
              <div className={styles.aboutuscontainer}>
      <h2 className ={styles.aboutuscontainerh2}>About Us</h2>
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
        </div>
      )}

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

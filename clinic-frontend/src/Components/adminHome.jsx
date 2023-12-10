import React from "react";
//import "./patient.css";
//import "./patientHome.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import pres from "../Images/perscriptionpatient.png";
import viewdoctor from "../Images/viewdoctorpatient.png";
import searchdoctor from "../Images/searchdoctor.png";
import healthpackages from "../Images/packages.png";
import LoadingPage from "./LoadingPage.jsx";
import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBarAdmin";
import Header from "../Elements/HeaderDoctor";
import styles from "./adminHome.module.css";
import ServiceInfo from "./infoWindow.jsx";

export const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [serviceItemName, setServiceItemName] = useState("");
  const [serviceItemDescription, setServiceItemDescription] = useState("");

  const handleClickDetails = (title, description) => {
    console.log(title, description);
    setServiceItemName(title);
    setServiceItemDescription(description);
    setShowOverlay(true);
  };


  useEffect(() => {
    const getCurrentPatient = async () => {
      try {
       } catch (error) {
        console.error("Error fetching current patient", error);
        // Handle error...
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentPatient();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div>
          <Header />
          <NavBar />
          <div className={styles.allContainers}>
            {/* Profile Side Menu */}

            {/* Sidebar */}
            <div
              className={styles.servicesContainer}
              style={{ justifyContent: "flex-start", margin: "20px 0 0 20px" }}
            >
              <ServiceItem
                imgSrc={searchdoctor}
                title="Manage Admins"
                description="Here you can manage all admins whether add or delete admin"
                method= {handleClickDetails}
                message="This module allows comprehensive management of admin accounts. You can add new admins to delegate responsibilities and maintain the system effectively. It also provides the functionality to review existing admin roles and remove admin access when needed, ensuring tight control over administrative privileges."
                />
              ,
              <ServiceItem
                imgSrc={viewdoctor}
                title="Manage Users"
                description="Explore profiles and expertise of all our available users"
                method= {handleClickDetails}
                message="Gain access to a comprehensive user management panel where you can explore profiles and expertise of two distinct user groups: doctors and patients. Utilize this feature to curate the list of active users, with options to remove profiles as necessary to maintain the integrity and accuracy of the user database."
                />
              ,
              <ServiceItem
                imgSrc={pres}
                title="Manage Pending Doctors"
                description="Show your medications prescribed online quickly and securely"
                method= {handleClickDetails}
                message="This portal is designed for the verification and approval of pending doctors, paving the way for them to commence their medical practice and patient care. Administrators have the ability to review detailed profiles, verify qualifications, examine uploaded credentials, and ensure each doctor meets the required standards before granting them the authority to operate within the platform."
                />
              ,
              <ServiceItem
                imgSrc={healthpackages}
                title="Manage Health Packages"
                description="Manage our system health plans for comprehensive care solutions"
                method= {handleClickDetails}
                message="Oversee and tailor our suite of health packages, ensuring they meet the diverse needs of our patients. With this feature, administrators can add new offerings to the system, update existing packages with the latest health solutions, or remove outdated options. This control enables the provision of tailored health plans that benefit patients with competitive and comprehensive care solutions."
                />
            </div>

            <div className={styles.aboutuscontainer}>
              <h2 className={styles.aboutuscontainerh2}>About Us</h2>
              <p
                style={{
                  padding: "2rem",
                  marginLeft: "3rem",
                  fontSize: "16pt",
                  lineHeight: 1.6,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                At Khaleha-ala-allah Clinic, we are dedicated to providing
                exceptional healthcare services tailored to meet the unique
                needs of our patients. With a commitment to excellence and a
                passion for wellness, our team of experienced healthcare
                professionals strives to deliver compassionate and comprehensive
                medical care.
              </p>
              <p
                style={{
                  marginTop: "2rem",
                  fontSize: "14pt",
                  lineHeight: 1.6,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                From routine check-ups to specialized medical services, we offer
                a range of healthcare solutions designed to promote a lifetime
                of optimal health. We look forward to serving you and your
                family with the highest standards of medical excellence.
              </p>
            </div>
          </div>
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

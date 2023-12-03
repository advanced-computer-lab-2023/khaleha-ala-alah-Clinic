import React, { useState, useEffect } from "react";
import styles from "./editPackageAdmin.module.css";
import doctorImage from "./doctor.png";
import AppointmentCard from "../Elements/AppointmentCard.jsx";
import { useLocation } from "react-router-dom";
import "../Elements/AppointmentCard.css";
import LoadingPage from "./LoadingPageForOverlay.jsx";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons"; // Importing a close icon from Ant Design
const backendUrl = "http://localhost:4000";

const EditPackage = ({ onCancel }) => {
  const navigate = useNavigate();
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state for appointments
  const [isLoading, setIsLoading] = useState(true); // Add a loading state for CurrentPatient
  const [currentPatient, setCurrentPatient] = useState([]); // Add a currentPatient state
  const [patientFamilyMembers, setPatientFamilyMember] = useState([]); // Add a patientFamilyMember state
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: -1,
    description: "",
    doctorsDiscount: -1,
    medicalDiscount: -1,
    familyDiscount: -1,
  });
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleCheckout = async (doctor, date) => {
    navigate("/appointmentCheckout", {
      state: { Doctor: doctor, Date: date, selectedOption: selectedOption },
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleAddHealthPackage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/packages/createPackage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        onCancel();
        throw new Error("Failed to add health package");
      }
      // Refresh the list of health packages after adding a new one
      onCancel();

      //fetchAllHealthPackages();
    } catch (err) {
      onCancel();
    }
  };
  return (
    <>
      <div
        className={styles.confirmationBackdrop}
        onClick={handleBackdropClick}
      >
        <div className={styles.confirmationDialog}>
          {loading ? ( // Render a loading message when loading is true
            <div className="testDiv">
              <LoadingPage />
            </div>
          ) : (
            <>
              <label htmlFor="name" className={styles.inputLabel}>
                Name
              </label>

              <input
                className={styles.infoPackages}
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <br />

              <label htmlFor="name" className={styles.inputLabel}>
                Price
              </label>
              <input
                className={styles.infoPackages}
                type="number"
                placeholder="Price"
                value={formData.price === -1 ? "" : formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <br />

              <label htmlFor="name" className={styles.inputLabel}>
                Description
              </label>
              <input
                className={styles.infoPackages}
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <br />

              <label htmlFor="name" className={styles.inputLabel}>
                Doctor's Discount
              </label>
              <input
                className={styles.infoPackages}
                type="number"
                placeholder="Doctor Discount"
                value={
                  formData.doctorsDiscount === -1
                    ? ""
                    : formData.doctorsDiscount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    doctorsDiscount: parseFloat(e.target.value),
                  })
                }
              />
              <br />

              <label htmlFor="name" className={styles.inputLabel}>
                Medical Discount
              </label>
              <input
                className={styles.infoPackages}
                type="number"
                placeholder="Medical Discount"
                value={
                  formData.medicalDiscount === -1
                    ? ""
                    : formData.medicalDiscount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalDiscount: parseFloat(e.target.value),
                  })
                }
              />
              <br />

              <label htmlFor="name" className={styles.inputLabel}>
                Family Discount
              </label>
              <input
                className={styles.infoPackages}
                type="number"
                placeholder="Family Discount"
                value={
                  formData.familyDiscount === -1 ? "" : formData.familyDiscount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    familyDiscount: parseFloat(e.target.value),
                  })
                }
              />
              <br />
              <button
                onClick={handleAddHealthPackage}
                className={styles.addPackage}
                style={{ width: "30%" }}
              >
                Add Health Package
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPackage;

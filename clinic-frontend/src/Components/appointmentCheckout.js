import React, { useRef } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./packageManagement.module.css";

const StripePaymentButton = () => {
  const [walletPaymentLoading, setWalletPaymentLoading] = useState(false);
  const [patientID, setPatientID] = useState("");
  const [showStripe, setShowStripe] = useState(false);
  const stripeRef = useRef(null);

  const onWalletPaymentClick = async () => {
    try {
      setWalletPaymentLoading(true);

      // Call the API for wallet amount update
      const response = await fetch(
        "http://localhost:4000/patients/wallet-amount-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            patientID: patientID,
            newWalletValue: amount22,
            // Add any other necessary data for the wallet update
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Wallet update successful:", data);

      console.log(selectedOption);
      if (selectedOption === "Myself") {
        try {
          console.log(
            `http://localhost:4000/patients/SelectAppointment/${
              doctor.userID
            }/${date.toISOString()}`
          );
          const response = await fetch(
            `http://localhost:4000/patients/SelectAppointment/${
              doctor.userID
            }/${date.toISOString()}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);
          if (data.status === "success") {
            // Handle success (e.g., show a success message or redirect)
            console.log("Appointment booked successfully");
          } else {
            console.error("Failed to book appointment");
          }
        } catch (error) {
          console.error("Error booking appointment:", error);
          // Handle error
        }
      } else {
        // http://localhost:4000/patients/SelectAppointmentFamilyMember/
        try {
          console.log(
            `http://localhost:4000/patients/SelectAppointmentFamilyMember/${
              doctor.userID
            }/${date.toISOString()}`
          );
          const response = await fetch(
            `http://localhost:4000/patients/SelectAppointmentFamilyMember/${
              doctor.userID
            }/${date.toISOString()}/${selectedOption}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);
          if (data.status === "success") {
            // Handle success (e.g., show a success message or redirect)
            console.log("Appointment booked successfully");
          } else {
            console.error("Failed to book appointment");
          }
        } catch (error) {
          console.error("Error booking appointment:", error);
          // Handle error
        }
      }
    } catch (error) {
      console.error("Failed to update wallet:", error);
      // Handle the error as needed
    } finally {
      setWalletPaymentLoading(false);
    }
  };

  useEffect(() => {
    // Call the getCurrentPatient API to get the patient ID
    const getCurrentPatient = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/patients/currentPatient",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPatientID(data.data.user.userID);
      } catch (error) {
        console.error("Error getting current patient:", error);
        // Handle the error as needed
      }
    };

    getCurrentPatient();
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  //   const amount22 = location.state?.amount;
  //   const medicalDiscount22 = location.state?.MedicalDiscount;
  //   const  doctorsDiscount22 = location.state?.DoctorsDiscount;
  //   const familyDiscount22 = location.state?.FamilyDiscount;
  //   const name22 = location.state?.Name;
  //   const familyMember22 = location.state?.familyMember
  //   console.log(location);
  const doctor = location.state?.Doctor;
  const date = location.state?.Date;
  const selectedOption = location.state?.selectedOption;
  const amount22 = doctor.hourlyRate;
  const onToken = (token) => {
    console.log(token);
    console.log(doctor);
    fetch("http://localhost:4000/patients/save-stripe-token", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: token,
        amount: amount22,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        alert(`Payment successful! Email: ${data.email}`);
        console.log(selectedOption);
        if (selectedOption === "Myself") {
          try {
            console.log(
              `http://localhost:4000/patients/SelectAppointment/${
                doctor.userID
              }/${date.toISOString()}`
            );
            const response = await fetch(
              `http://localhost:4000/patients/SelectAppointment/${
                doctor.userID
              }/${date.toISOString()}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            console.log(data);
            if (data.status == "success") {
              // Handle success (e.g., show a success message or redirect)
              console.log("Appointment booked successfully");
            } else {
              console.error("Failed to book appointment");
            }
          } catch (error) {
            console.error("Error booking appointment:", error);
            // console.log(error.message);
            // Handle error
          }
        } else {
          // http://localhost:4000/patients/SelectAppointmentFamilyMember/
          try {
            console.log(
              `http://localhost:4000/patients/SelectAppointmentFamilyMember/${
                doctor.userID
              }/${date.toISOString()}`
            );
            const response = await fetch(
              `http://localhost:4000/patients/SelectAppointmentFamilyMember/${
                doctor.userID
              }/${date.toISOString()}/${selectedOption}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            console.log(data);
            if (data.status == "success") {
              // Handle success (e.g., show a success message or redirect)
              console.log("Appointment booked successfully");
              try {
                fetch("http://localhost:4000/notifications", {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    title: "Appointment is booked successfuly",
                    text:
                      "You have an appointment with " +
                      doctor.name +
                      " at " +
                      date.toISOString(),
                  }),
                });
              } catch (error) {
                console.error("notficaion is not saved yet", error);
              }
            } else {
              console.error("Failed to book appointment");
            }
          } catch (error) {
            console.error("Error booking appointment:", error);
            // console.log(error.message);
            // Handle error
          }
        }
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        // Handle the error as needed
      });
  };
  const handleWallet = () => {};

  const onCancel = () => {
    console.log("Payment Cancelled or Failed");
  };

  const handleButtonClick = () => {
    if (stripeRef.current) {
      stripeRef.current.onClick();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.addFamMemCont}
        onClick={() => {
          onWalletPaymentClick();
        }}
        disabled={walletPaymentLoading}
      >
        <h2>Pay With Wallet</h2>
        <p className={styles.addFamMemPar} style={{ marginTop: "1rem" }}>
          {" "}
          Use your wallet funds to pay
        </p>
      </div>

      <div className={styles.pageContainer}>
        <div
          className={styles.addFamMemCont}
          onClick={() => {
            //setShowStripe(true);
            handleButtonClick();
          }}
          disabled={walletPaymentLoading}
        >
          <h2>Pay With Your Credit Card</h2>{" "}
          <p className={styles.addFamMemPar} style={{ marginTop: "1rem" }}>
            {" "}
            Use your Credit Card to pay
          </p>
        </div>
        <StripeCheckout
          ref={stripeRef}
          token={onToken}
          onClose={onCancel}
          name="Package Subscription"
          currency="USD"
          amount={amount22 * 100} // Convert amount to cents
          stripeKey="pk_test_51LYdhJF0BL68bZ9bNouUaO2Cutn6GjQUDsc7Q1JQRXRAZd4mSRqV3d5G3On4SlM44iWnXlorkDELEGGVF7nBgGpX00buYL644E"
          opened={() => setShowStripe(true)}
          closed={() => setShowStripe(false)}
          trigger="true"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default StripePaymentButton;

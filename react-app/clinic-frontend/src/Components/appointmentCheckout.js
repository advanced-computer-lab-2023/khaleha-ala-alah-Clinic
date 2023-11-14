import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StripePaymentButton = ({ Date, Doctor }) => {
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

  const onCancel = () => {
    console.log("Payment Cancelled or Failed");
    // You can handle the cancellation or failure here.
  };

  return (
    <StripeCheckout
      token={onToken}
      onClose={onCancel}
      name="Package Subscription"
      currency="USD"
      amount={amount22 * 100} // Convert amount to cents
      stripeKey="pk_test_51LYdhJF0BL68bZ9bNouUaO2Cutn6GjQUDsc7Q1JQRXRAZd4mSRqV3d5G3On4SlM44iWnXlorkDELEGGVF7nBgGpX00buYL644E"
    />
  );
};

export default StripePaymentButton;

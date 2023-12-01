import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const StripePaymentButton = ({ amount ,medicalDiscount,doctorsDiscount,familyDiscount,name}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount22 = location.state?.amount; 
  const medicalDiscount22 = location.state?.MedicalDiscount;
  const  doctorsDiscount22 = location.state?.DoctorsDiscount;
  const familyDiscount22 = location.state?.FamilyDiscount;
  const name22 = location.state?.Name;
  const onToken = (token) => {
    console.log(token);
    console.log('amounttt ++ ' + amount22);
    fetch('http://localhost:4000/patients/save-stripe-token', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({
        token: token,
        amount: amount22,
      }),
    })
    .then(response =>  response.json())
    .then(async data => {
      console.log(data);
      alert(`Payment successful! Email: ${data.email}`);
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          medicalDiscount: medicalDiscount22,
          doctorsDiscount: doctorsDiscount22,
          familyDiscount: familyDiscount22,
          packageName: name22,
        }),
      };  
      try {
        const response = await fetch(
          "http://localhost:4000/patients/subscribeToPackage",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Subscription successful:", data);
        // Handle any post-subscription logic here
        try{
          fetch('http://localhost:4000/notifications', {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
              title: "Package Subscription",
              text: "You have successfully subscribed to " + name22 + " package",
            }),
          });
          // await axios.post('http://localhost:4000/notifications',notficationData).then(async (res)=>{
          //   console.log('notfication is saved');
          // })
        }
        catch(error){
          console.error("notficaion is not saved yet", error);
        }
        navigate('/myselfPackages');

      } catch (error) {
        console.error("Failed to subscribe:", error);
      }
      // You may want to perform additional actions on successful payment
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      // Handle the error as needed
    });
  }

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
      amount={amount * 100} // Convert amount to cents
      stripeKey="pk_test_51LYdhJF0BL68bZ9bNouUaO2Cutn6GjQUDsc7Q1JQRXRAZd4mSRqV3d5G3On4SlM44iWnXlorkDELEGGVF7nBgGpX00buYL644E"
    />
  );
};

export default StripePaymentButton;

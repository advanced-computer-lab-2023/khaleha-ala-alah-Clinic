import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const StripePaymentButton = ({ amount ,medicalDiscount,doctorsDiscount,familyDiscount,name}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount22 = location.state?.amount; 
  const medicalDiscount22 = location.state?.MedicalDiscount;
  const  doctorsDiscount22 = location.state?.DoctorsDiscount;
  const familyDiscount22 = location.state?.FamilyDiscount;
  const name22 = location.state?.Name;
   const REMOVE_FROM_WALLET_API = 'http://localhost:4000/patients/remove-from-wallet';
  const handlePayment = async (userID, amount) => {
    try {
      // Assuming you have the userID and amount needed for the payment
      const userIDParam = userID;
      const amountParam = amount; // Replace with the actual amount to remove

      // Make API call to remove amount from the wallet
      const response = await fetch(REMOVE_FROM_WALLET_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userIDParam,
          amount: amountParam,
        }),
      });

      const result = await response.json();

      // Check if the API call was successful
      if (response.ok) {
        // Payment successful, show success alert or perform other actions
        alert('Payment successful!');
      } else {
        // Payment failed, show error alert or handle accordingly
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during payment:', error);
      // Handle error (show error alert or perform other actions)
      alert('An error occurred during payment. Please try again.');
    }
  };
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
    <div>
 <StripeCheckout
      token={onToken}
      onClose={onCancel}
      name="Package Subscription"
      currency="USD"
      amount={amount * 100} // Convert amount to cents
      stripeKey="pk_test_51LYdhJF0BL68bZ9bNouUaO2Cutn6GjQUDsc7Q1JQRXRAZd4mSRqV3d5G3On4SlM44iWnXlorkDELEGGVF7nBgGpX00buYL644E"
    />
 
      <button onClick={() => handlePayment("651f027139c907c160a30acd",(amount*100))}>
        Pay with wallet
      </button>
    </div>
   


  );
};

export default StripePaymentButton;

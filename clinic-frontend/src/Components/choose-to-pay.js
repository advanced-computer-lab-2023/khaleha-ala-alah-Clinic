

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Doctor, Date } = location.state || {};
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

  const handlePaymentSelection = (paymentOption) => {
    if (paymentOption === "wallet") {
      // Use the userID and amount from your state or another source
      const userID = "651f027139c907c160a30acd";
      const amount = 100;
      // Call the handlePayment function with the userID and amount
      handlePayment(userID, amount);
    } else if (paymentOption === "card") {
      // Navigate to card payment page with Doctor and Date values
      navigate("/appointment-book", { state: { Doctor, Date } });
    }
  };

  return (
    <div>
      <h1>Select Payment Method</h1>
      <button onClick={() => handlePaymentSelection("wallet")}>
        Pay with Wallet
      </button>
      <button onClick={() => handlePaymentSelection("card")}>
        Pay with Card
      </button>
    </div>
  );
};

export default PaymentMethod;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Doctor, Date } = location.state || {}; // Destructuring values from location.state

  const handlePaymentSelection = (paymentOption) => {
    if (paymentOption === "wallet") {
      // Navigate to wallet payment page with Doctor and Date values
      navigate("/wallet-payment", { state: { Doctor, Date } });
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

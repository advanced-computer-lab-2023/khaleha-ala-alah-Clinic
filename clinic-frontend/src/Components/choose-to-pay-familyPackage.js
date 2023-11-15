

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethodSubscriptionFamily = ({familyMember,amount ,medicalDiscount,doctorsDiscount,familyDiscount,name}) => {
  const navigate = useNavigate();
  const location = useLocation();
  //const { Doctor, Date } = location.state || {};
//   const doctor = location.state?.Doctor;
//   const date = location.state?.Date;
//   const amount22 = doctor.hourlyRate;
//   const selectedOption = location.state?.selectedOption;
//   console.log("selectedOption");
//   console.log(selectedOption);
//   const amount22 = location.state?.amount; 
//   const medicalDiscount22 = location.state?.MedicalDiscount;
//   const  doctorsDiscount22 = location.state?.DoctorsDiscount;
//   const familyDiscount22 = location.state?.FamilyDiscount;
//   const name22 = location.state?.Name;
const amount22 = location.state?.amount; 
const medicalDiscount22 = location.state?.MedicalDiscount;
const  doctorsDiscount22 = location.state?.DoctorsDiscount;
const familyDiscount22 = location.state?.FamilyDiscount;
const name22 = location.state?.Name;
const familyMember22 = location.state?.familyMember

const REMOVE_FROM_WALLET_API = 'http://localhost:4000/patients/remove-from-wallet';
  const handlePayment = async (userID, amount) => {
    try {
      // Assuming you have the userID and amount needed for the payment
      const userIDParam = userID;
      const amountParam = amount; // Replace with the actual amount to remove
           
      
        const response1 = await fetch(
          `http://localhost:4000/patients/subscribeForFamilyMember?id=${userID}`,
    
        );
        if (!response1.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response1.json();
        console.log("Subscription successful:", data);
      
        // Handle any post-subscription logic here
    
      
      // Make API call to remove amount from the wallet
      const response = await fetch(REMOVE_FROM_WALLET_API, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
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
      //navigate("/appointment-book", { state: { Doctor, Date } });
    //   console.log("hello world" + doctor + Date);
    //   console.log(doctor);
      navigate('/CheckoutFamilyMemberPaackage',{state:{familyMember : familyMember22 ,amount: amount22 , MedicalDiscount : medicalDiscount22 , DoctorsDiscount:doctorsDiscount22 , 
      FamilyDiscount:familyDiscount22 ,Name:name22 }})
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

export default PaymentMethodSubscriptionFamily;

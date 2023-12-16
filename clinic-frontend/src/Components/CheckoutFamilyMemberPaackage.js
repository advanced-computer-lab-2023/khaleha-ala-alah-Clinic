import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StripePaymentButton = ({
  familyMember,
  amount,
  medicalDiscount,
  doctorsDiscount,
  familyDiscount,
  name,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount22 = location.state?.amount;
  const medicalDiscount22 = location.state?.MedicalDiscount;
  const doctorsDiscount22 = location.state?.DoctorsDiscount;
  const familyDiscount22 = location.state?.FamilyDiscount;
  const name22 = location.state?.Name;
  const familyMember22 = location.state?.familyMember;

  const [walletPaymentLoading, setWalletPaymentLoading] = useState(false);
  const [patientID, setPatientID] = useState(null);

  useEffect(() => {
    const getCurrentPatient = async () => {
      try {
        const response = await fetch("http://localhost:4000/patients/currentPatient", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPatientID(data.data.user.userID);
        console.log(data);
      } catch (error) {
        console.error("Failed to get current patient:", error);
        // Handle the error as needed
      }
    };

    getCurrentPatient();
  }, []); // Run once on component mount

  const onWalletPaymentClick = async () => {
    try {
      setWalletPaymentLoading(true);

      if (!patientID) {
        throw new Error("Patient ID is not available");
      }

      // Call the API for wallet amount update
      const response = await fetch("http://localhost:4000/patients/wallet-amount-update", {
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
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Wallet update successful:", data);

      // Now you can proceed with the Stripe payment logic
      // ...
      
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
          console.log(
            "gwaaa awyyyy  idddd:---" +
              familyMember22.userID +
              medicalDiscount22,
            doctorsDiscount22,
            familyDiscount22,
            name22
          );
          console.log("requestedOptionsss  " + requestOptions);
          const response = await fetch(
            `http://localhost:4000/patients/subscribeForFamilyMember?id=${familyMember22.userID}&nationalID=${familyMember22.nationalID}`,
            requestOptions
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Subscription successful:", data);
          navigate("/familyMemberPackages");
          // Handle any post-subscription logic here
        } catch (error) {
          console.error("Failed to subscribe:", error);
        }

    } catch (error) {
      console.error("Failed to update wallet:", error);
      // Handle the error as needed
    } finally {
      setWalletPaymentLoading(false);
    }
  };

  const onToken = (token) => {
    console.log(token);
    console.log("amounttt ++ " + amount22);
    console.log(medicalDiscount22, doctorsDiscount22, familyDiscount22, name22);

    // ... Your existing Stripe payment logic
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
          console.log(
            "gwaaa awyyyy  idddd:---" +
              familyMember22.userID +
              medicalDiscount22,
            doctorsDiscount22,
            familyDiscount22,
            name22
          );
          console.log("requestedOptionsss  " + requestOptions);
          const response = await fetch(
            `http://localhost:4000/patients/subscribeForFamilyMember?id=${familyMember22.userID}&nationalID=${familyMember22.nationalID}`,
            requestOptions
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Subscription successful:", data);
          navigate("/familyMemberPackages");
          // Handle any post-subscription logic here
        } catch (error) {
          console.error("Failed to subscribe:", error);
        }
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        // Handle the error as needed
      });
  };

  const onCancel = () => {
    console.log("Payment Cancelled or Failed");
    // Your existing onCancel logic
  };

  return (
    <div>
      <button onClick={onWalletPaymentClick} disabled={walletPaymentLoading}>
        Pay with Wallet
      </button>
      <StripeCheckout
        token={onToken}
        onClose={onCancel}
        name="Package Subscription"
        currency="USD"
        amount={amount * 100} // Convert amount to cents
        stripeKey="your_stripe_public_key"
      />
    </div>
  );
};

export default StripePaymentButton;

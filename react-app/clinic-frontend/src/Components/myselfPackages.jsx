import React, { useState, useEffect } from "react";
import axios from "axios";
import PackageSubscriptionComponent from "./packagesPage";
import PackageDetails from "./packageDetails";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
//import "../Elements/ConfirmationDialog.css";
import LoadingPage from "./LoadingPage.jsx";

import { useNavigate } from "react-router-dom";

const MyselfPackages = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateTo = (path) => {
    navigate(path); // Call navigate with the path
  };
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/patients/currentPatient",
          {
            headers: {
              // Assuming you're sending the token for authentication
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCurrentPatient(response.data.data.user);
      } catch (error) {
        console.error("Error fetching current patient", error);
        // Handle error...
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentPatient();
  }, []);

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleUnsubscribeConfirm = async () => {
    setShowConfirmationDialog(false); // Close the dialog
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:4000/patients/unsubscribeFromPackage",
        {
          // Include necessary data for the unsubscribe request
          // For example, if you need to send the patient ID:
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json", // This is typically not needed as axios sets it by default when sending an object
            // ... any other headers
          },
        }
      );
      console.log("Unsubscription successful:", response.data);
      setIsLoading(false);
      navigateTo("/managePackages");

      // Handle any post-unsubscription logic here, such as updating state or UI
    } catch (error) {
      console.error(
        "Failed to unsubscribe:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUnsubscribe = () => {
    // This function is called when the Unsubscribe button is clicked
    // It just opens the confirmation dialog
    setShowConfirmationDialog(true);
  };
  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (!currentPatient) {
    return <div>Error: Patient data not available.</div>;
  }
  console.log(currentPatient);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : currentPatient ? (
        currentPatient.packageName === "none" ? (
          <PackageSubscriptionComponent />
        ) : (
          <>
            <PackageDetails
              patient={currentPatient}
              onUnsubscribe={handleUnsubscribe}
            />
            {showConfirmationDialog && (
              <ConfirmationDialog
                message="Are you sure you want to unsubscribe?"
                confirmLabel="Yes"
                cancelLabel="No"
                onConfirm={handleUnsubscribeConfirm}
                onCancel={() => setShowConfirmationDialog(false)}
              />
            )}
          </>
        )
      ) : (
        <div>Error: Patient data not available.</div>
      )}
    </div>
  );
};

export default MyselfPackages;

import React, { useState, useEffect } from "react";
import PackageCard from "./packageCard";
import "./packageCard.css"; // Assuming you have a CSS file for styling
import { useLocation } from "react-router-dom";

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const location = useLocation();
  const familyMember = location.state?.familyMember;

  useEffect(() => {
    // Define the function that fetches the packages
    const fetchPackages = async () => {
      try {
        // Make the HTTP request to the API
        const response = await fetch("http://localhost:4000/packages");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        // Update the state with the fetched packages
        setPackages(data.data.packages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };
    const fetchCurrentPatient = async () => {
      try {
        // Make the HTTP request to the API
        const response = await fetch(
          "http://localhost:4000/patients/currentPatient",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json", // Specify the content type if needed
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        console.log(data.data.user);
        // Update the state with the fetched packages
        setCurrentPatient(data.data.user);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchCurrentPatient();

    // Call the function
    fetchPackages();
  }, []);

  const handleSubscribe = async (
    medicalDiscount,
    doctorsDiscount,
    familyDiscount,
    name
  ) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        medicalDiscount: medicalDiscount,
        doctorsDiscount: doctorsDiscount,
        familyDiscount: familyDiscount,
        packageName: name,
      }),
    };
    console.log(medicalDiscount, doctorsDiscount, familyDiscount, name);
    console.log(familyMember);

    try {
      const response = await fetch(
        `http://localhost:4000/patients/subscribeForFamilyMember?id=${familyMember.userID}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Subscription successful:", data);
      // Handle any post-subscription logic here
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  return (
    <div className="AppPackages">
      {packages.map((packageItem) => (
        <PackageCard
          //key={packageItem.id} // Use a unique key for each child, like an ID
          name={packageItem.name}
          details={[
            {
              label: "Medical Discount",
              value: `${
                packageItem.medicalDiscount < 1
                  ? packageItem.medicalDiscount * 100
                  : packageItem.medicalDiscount
              }%`,
            },
            {
              label: "Doctor's Discount",
              value: `${
                packageItem.doctorsDiscount < 1
                  ? packageItem.doctorsDiscount * 100
                  : packageItem.doctorsDiscount
              }%`,
            },
            {
              label: "Family Discount",
              value: `${
                packageItem.familyDiscount < 1
                  ? packageItem.familyDiscount * 100
                  : packageItem.familyDiscount
              }%`,
            },
            {
              label: "Price",
              value:
                currentPatient.packageName === "none" ? (
                  `${packageItem.price}`
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginRight: "5px",
                      }}
                    >
                      {`${packageItem.price}`}
                    </span>
                    {`${
                      packageItem.price -
                      packageItem.price *
                        (currentPatient.familyDiscount < 1
                          ? currentPatient.familyDiscount
                          : currentPatient.familyDiscount / 100.0)
                    }`}
                  </>
                ),
            },
          ]} // Adjust based on the actual structure of your package data
          buttonsDetails={[
            {
              text: "Subscribe",
              onClick: () =>
                handleSubscribe(
                  packageItem.medicalDiscount,
                  packageItem.doctorsDiscount,
                  packageItem.familyDiscount,
                  packageItem.name
                ),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default PackagesPage;

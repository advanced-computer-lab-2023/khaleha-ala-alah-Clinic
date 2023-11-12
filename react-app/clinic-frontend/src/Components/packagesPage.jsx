import React, { useState, useEffect } from "react";
import PackageCard from "../Elements/packageCard";
import "../Elements/packageCard.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";

const PackagesPage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

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
        console.log("dataaaaa:------ " + data);
        // Update the state with the fetched packages
        setPackages(data.data.packages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    // Call the function
    fetchPackages();
  }, []);

  const handleSubscribe = async (
    medicalDiscount,
    doctorsDiscount,
    familyDiscount,
    name,
    price
  ) => {
    navigate("/checkout", { state: { amount: price } });
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
            { label: "Price", value: `${packageItem.price}` },
          ]} // Adjust based on the actual structure of your package data
          buttonsDetails={[
            {
              text: "Subscribe",
              onClick: () =>
                handleSubscribe(
                  packageItem.medicalDiscount,
                  packageItem.doctorsDiscount,
                  packageItem.familyDiscount,
                  packageItem.name,
                  packageItem.price
                ),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default PackagesPage;

import React, { useState, useEffect } from "react";
import HealthPackageCard from "../Elements/HealthPackageCard";
import { useNavigate } from "react-router-dom";
import styles from './packagesPage.module.css';


const PackagesPage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const packagesPerPage = 3;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

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
    navigate('/checkout', { state: { amount: price , MedicalDiscount : medicalDiscount , DoctorsDiscount:doctorsDiscount , 
    FamilyDiscount:familyDiscount ,Name:name } });  
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - packagesPerPage : 0));
    setIsAnimating(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + packagesPerPage < packages.length ? prevIndex + packagesPerPage : prevIndex));
    setIsAnimating(true);

  };

  return (
    <div className={styles.PackagesContainerViewing}>
    <div className={styles.ViewAllPackages} style={{ 
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)',
        transition: 'opacity 0.5s ease, transform 0.5s ease' 
      }} 
      onAnimationEnd={handleAnimationEnd}>       

        {currentIndex > 0 && <button className={styles.leftArrowCss} onClick={handlePrev}>{"<"}</button>}
        {packages.slice(currentIndex, currentIndex + packagesPerPage).map((packageItem) => (
          <HealthPackageCard
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
          {currentIndex + packagesPerPage < packages.length && <button className={styles.rightArrowCss} onClick={handleNext}>{">"}</button>}
        </div>
      </div>
  );
};

export default PackagesPage;

import React, { useState, useEffect } from "react";
import HealthPackageCard from "../Elements/HealthPackageCard";
import { useNavigate } from "react-router-dom";
import styles from "./packagesPage.module.css";
import Slider from "react-animated-slider";
import horizontalCss from "react-animated-slider/build/horizontal.css";
import NavBar from "../Elements/NavBar";
import Header from "../Elements/Header";

const PackagesPage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const packagesPerPage = 3;
  const cardWidth = 320; // Width of each card
  const gap = 20; // Gap between cards

  // States to manage animations and translateX values for old and new packages
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch packages when the component mounts
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:4000/packages");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPackages(data.data.packages);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (
    medicalDiscount,
    doctorsDiscount,
    familyDiscount,
    name,
    price
  ) => {
    navigate("/checkout", {
      state: {
        amount: price,
        MedicalDiscount: medicalDiscount,
        DoctorsDiscount: doctorsDiscount,
        FamilyDiscount: familyDiscount,
        Name: name,
      },
    });
  };

  const groupPackages = (packages, packagesPerSlide) => {
    const grouped = [];
    for (let i = 0; i < packages.length; i += packagesPerSlide) {
      grouped.push(packages.slice(i, i + packagesPerSlide));
    }
    console.log(grouped);
    return grouped;
  };

  const groupedPackages = groupPackages(packages, 3);

  return (
    <>
      <Header />
      <NavBar
        selectedSection={"packages"}
        selectedSubSection={"yourPackages"}
      />
      <div className={styles.PackagesContainerViewing}>
        <div className={styles.ViewAllPackages}>
          <Slider>
            {groupedPackages.map((packageSet, index) => (
              <div key={index} className={styles.slide}>
                <div className={styles.packageSet}>
                  {packageSet.map((packageItem, packageIndex) => (
                    <HealthPackageCard
                      key={packageItem.id}
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
                      ]}
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default PackagesPage;

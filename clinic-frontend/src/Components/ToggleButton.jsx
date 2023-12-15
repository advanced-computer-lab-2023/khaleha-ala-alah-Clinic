import React, { useState, useEffect } from "react";
import styles from "./toggleSwitch.module.css"; // Assume you have a CSS module for styling

// Clinic's ToggleButton component
const ToggleButton = () => {
  const [currentSite, setCurrentSite] = useState("clinic");
  const [isOn, setIsOn] = useState(false); // Start as untoggled

  useEffect(() => {
    // Set the initial state based on the URL
    const currentURL = window.location.href;
    if (currentURL.includes(":3001")) {
      setCurrentSite("pharmacy");
      setIsOn(true); // Toggled state for pharmacy
    }
  }, []);

  const handleToggle = () => {
    setIsOn(!isOn);
    setTimeout(() => {
      // Redirect logic
      window.location.href =
        currentSite === "clinic"
          ? "http://localhost:3001"
          : "http://localhost:3000";
    }, 200);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className={`${styles.slider} ${isOn ? styles.checked : ""}`}></span>
    </label>
  );
};

export default ToggleButton;

import React from "react";
import styles from "./HealthPackageCard.module.css"; // Make sure the path is correct
import checkIcon from "../Images/doneIcon.png"; // Import your icon image

const HealthPackageCard = ({ name, details = [], buttonsDetails = [] }) => {
  return (
    <div className={styles.healthCard}>
      <h2 className={styles.healthName}>{name}</h2>
      <div className={styles.separatorLineContainer}>
        <hr className={styles.separatorLine} /> {/* Separator line added */}
      </div>
      {details.map((detail, index) => {
        // Check if the current element is the last in the array
        const isLastElement = index === details.length - 1;

        return (
          <div key={index}>
            {!isLastElement && detail.value && detail.label && (
              <div className={styles.detailRow}>
                <img
                  src={checkIcon}
                  alt="Check"
                  className={styles.iconStylePack}
                />
                <p 
                className={styles.healthDetails}>
                  {detail.label}: {detail.value}
                </p>
              </div>
            )}

            {isLastElement && (
              <p className={styles.lastDetailText}>
               {detail.value} EGP
              </p>
            )}
          </div>
        );
      })}

      <div className={styles.healthButtons}>
        {buttonsDetails.map((buttonDetail, index) => (
          <button
          style={{ marginTop:"-10px" }}
            className={styles.subscribeButton}
            onClick={buttonDetail.onClick}
            key={index}
          >
            {buttonDetail.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthPackageCard;

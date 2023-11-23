import React from "react";
import styles from "./HealthPackageCard.module.css"; // Make sure the path is correct
import checkIcon from '../Images/check.png'; // Import your icon image

const HealthPackageCard = ({
  name,
  details = [], 
  buttonsDetails = [],
}) => {
  return (
    <div className={styles.healthCard}>
      <h2 className={styles.healthName}>{name}</h2>
      <div className={styles.separatorLineContainer}>
      <hr className={styles.separatorLine} /> {/* Separator line added */}
      </div>
      {details.map((detail, index) => (
        detail.value && detail.label && (
          <div className={styles.detailRow} key={index}>
            <img src={checkIcon} alt="Check" className={styles.iconStyle} /> {/* Icon next to each detail */}
            <p className={styles.healthDetails}>
              {detail.label}: {detail.value}
            </p>
          </div>
        )
      ))}
      <div className={styles.healthButtons}>
        {buttonsDetails.map((buttonDetail, index) => (
          <button
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

import React from "react";
import styles from "./infoWindow.module.css";
import { CloseOutlined } from "@ant-design/icons"; // Importing a close icon from Ant Design

const InfoWindow = ({ title, message, onCancel, cancelLabel}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
      <div className={styles.confirmationDialog}>
        <button
          className={styles.closeButton}
          onClick={() => {
            onCancel();
          }}
        >
        </button>
        <h2 className={styles.confirmationTitle}>{title}</h2>
        <p className={styles.confirmationMessage}>{message}</p>
        <div className={styles.confirmationButtons}>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};


export default InfoWindow;

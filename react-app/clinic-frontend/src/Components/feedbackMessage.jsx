import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Alert } from "antd";
import styles from "./feedbackMessage.module.css";

const FeedbackMessage = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert
      message={
        type == "error"
          ? "Oh Snap!"
          : type == "success"
          ? "Success!"
          : "Warning!"
      }
      description={message}
      type={type}
      onClose={onClose}
      //closable
      afterClose={onClose}
      showIcon
      className={styles.feedbackMessage}
    />
  );
};

FeedbackMessage.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FeedbackMessage;

import React from "react";
import styles from "./overlayWindow.module.css";

const OverlayWindow = ({ message, onCancel, cancelLabel }) => {
  return (
    <div className={styles.confirmationBackdrop}>
      <div className={styles.confirmationDialog}>
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

/*

 ////////// creating of useState and confirm and cancel buttons /////////
 const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    // Handle the confirmation action
    setShowDialog(false);
    setpatients(!showpateints);

  };

  const handleCancel = () => {
    // Handle the cancel action
    setpatients(showpateints);
    setShowDialog(false);
  };

  const handleButton = () => {
    // Toggle the state of patients
    setShowDialog(true);

  };

//////////// calling of the method with useState ///////////////
 </><div>
        {showDialog && (
          <ConfirmationDialog
            message="Are you sure?"
            confirmLabel="Allow"
            cancelLabel="Don't Allow"
            onConfirm={handleConfirm}
            onCancel={handleCancel} />
        )}
      </div></>

*/

export default OverlayWindow;

import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import styles from "./notFound.module.css";
import errorPic from "../Images/Error.png";

const NotFound = () => {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (role) {
      setIsLoading(false);
    }
  }, [role]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
          <div className={styles.errorHeader}>
            <h1 className={styles.errorTitle}>404</h1> <p className={styles.errorMessage}>Not Found</p>
            </div>
            <img src={errorPic} alt="Error" className={styles.errorImage} />
            <a href="/" className={styles.errorLink}>
              Go Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from "react";
import styles from "./packages.module.css";

const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [selectedHealthPackage, setSelectedHealthPackage] = useState({});
  const [selectedID, setSelectedID] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: -1,
    description: "",
    doctorDiscount: -1,
    medicalDiscount: -1,
    familyDiscount: -1,
  });

  // Function to fetch all health packages
  const fetchAllHealthPackages = async () => {
    try {
      const response = await fetch("http://localhost:4000/packages/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setHealthPackages(data.data.packages);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllHealthPackages();
  }, []);

  const handleHealthPackageClick = (healthPackage) => {
    setSelectedID(healthPackage._id);

    setSelectedHealthPackage(healthPackage);
    setFormData({
      name: healthPackage.name,
      price: healthPackage.price,
      description: healthPackage.description,
      doctorDiscount: healthPackage.doctorDiscount,
      medicalDiscount: healthPackage.medicalDiscount,
      familyDiscount: healthPackage.familyDiscount,
    });
  };

  const handleAddHealthPackage = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/packages/createPackage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add health package");
      }
      // Refresh the list of health packages after adding a new one
      fetchAllHealthPackages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateHealthPackage = async () => {
    try {
      formData.id = selectedID;

      const response = await fetch(
        "http://localhost:4000/packages/updatePackage",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update health package");
      }

      // Refresh the list of health packages after updating
      fetchAllHealthPackages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteHealthPackage = async () => {
    // Use the selectedHealthPackage data to delete a health package
    // Make a DELETE request to the corresponding API endpoint

    try {
      formData.id = selectedID;

      const response = await fetch(
        "http://localhost:4000/packages/deletePackage",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update health package");
      }

      // Refresh the list of health packages after updating
      fetchAllHealthPackages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Health Packages</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <h3>Packages List</h3>
        <ul>
          {healthPackages.map((healthPackage) => (
            <li key={healthPackage._id} onClick={() => {}}>
              {healthPackage.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add Health Package</h3>
        <input
          className={styles.infoPackages}
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className={styles.infoPackages}
          type="number"
          placeholder="Price"
          value={formData.price === -1 ? "" : formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseInt(e.target.value) })
          }
        />
        <input
          className={styles.infoPackages}
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          className={styles.infoPackages}
          type="number"
          placeholder="Doctor Discount"
          value={formData.doctorDiscount === -1 ? "" : formData.doctorDiscount}
          onChange={(e) =>
            setFormData({
              ...formData,
              doctorDiscount: parseFloat(e.target.value),
            })
          }
        />
        <input
          className={styles.infoPackages}
          type="number"
          placeholder="Medical Discount"
          value={
            formData.medicalDiscount === -1 ? "" : formData.medicalDiscount
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              medicalDiscount: parseFloat(e.target.value),
            })
          }
        />
        <input
          className={styles.infoPackages}
          type="number"
          placeholder="Family Discount"
          value={formData.familyDiscount === -1 ? "" : formData.familyDiscount}
          onChange={(e) =>
            setFormData({
              ...formData,
              familyDiscount: parseFloat(e.target.value),
            })
          }
        />
        <button className={styles.addPackage} onClick={handleAddHealthPackage}>
          Add Health Package
        </button>
      </div>
    </div>
  );
};

export default HealthPackages;

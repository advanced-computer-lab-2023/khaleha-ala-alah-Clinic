import React, { useState, useEffect } from "react";
import styles from "./packages.module.css";
import Table from "./table.jsx";
import { Avatar, Button, Modal, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import EditPackageOverlay from "./editPackageAdminOverlay.jsx";
import { PlusOutlined } from "@ant-design/icons";
import AddPackageOverlay from "./AddHealthPackageOverlay.jsx";
import NavBar from "../Elements/NavBarAdmin";
import Header from "../Elements/HeaderDoctor";
import Separator from "./separator.jsx";


const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [selectedHealthPackage, setSelectedHealthPackage] = useState({});
  const [selectedID, setSelectedID] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    doctorsDiscount: 0,
    medicalDiscount: 0,
    familyDiscount: 0,
  });
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const [showAddOverlay, setShowAddOverlay] = useState(false);

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
      doctorsDiscount: healthPackage.doctorsDiscount,
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
      console.log(formData);

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
      setShowDeleteConfirmationDialog(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const actions = (healthPackage) => (
    <div className={styles.buttonsList}>
      <Button
        onClick={() => {
          setShowEditOverlay(true);
          setSelectedID(healthPackage.package._id);
          setFormData({
            name: healthPackage.name,
            price: healthPackage.price,
            description: healthPackage.description,
            doctorsDiscount: healthPackage.doctorsDiscount,
            medicalDiscount: healthPackage.medicalDiscount,
            familyDiscount: healthPackage.familyDiscount,
          });
        }}
        shape="circle"
        type="primary"
        icon={<EditOutlined />}
        className={styles.editButton}
      />
      <Button
        onClick={() => {
          console.log(healthPackage.name + "<<<<<<");
          setSelectedID(healthPackage.package._id);
          setFormData({
            name: healthPackage.name,
            price: healthPackage.price,
            description: healthPackage.description,
            doctorsDiscount: healthPackage.doctorsDiscount,
            medicalDiscount: healthPackage.medicalDiscount,
            familyDiscount: healthPackage.familyDiscount,
          });
          setShowDeleteConfirmationDialog(true);
        }}
        shape="circle"
        danger
        icon={<DeleteOutlined />}
        className={styles.deleteButton}
      />
    </div>
  );

  const data = healthPackages.map((healthPackage) => ({
    package: healthPackage,
    name: healthPackage.name,
    description: healthPackage.description,
    price: healthPackage.price,
    doctorsDiscount: healthPackage.doctorsDiscount,
    medicalDiscount: healthPackage.medicalDiscount,
    familyDiscount: healthPackage.familyDiscount,
  }));

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Package Name",
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
    },
    {
      key: "doctorsDiscount",
      dataIndex: "doctorsDiscount",
      title: "Doctor Discount",
    },
    {
      key: "medicalDiscount",
      dataIndex: "medicalDiscount",
      title: "Medical Discount",
    },
    {
      key: "familyDiscount",
      dataIndex: "familyDiscount",
      title: "Family Discount",
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, healthPackage) => actions(healthPackage),
    },
  ];

  return (
    <>
       <Header />
      <NavBar />
    <div className={styles.packageAdminContainer}>
      <h1>Health Packages</h1>
      <Separator/>
      {error && <p>Error: {error}</p>}
      <div>
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => {
              setShowAddOverlay(true);
            }}
            className={styles.addPackageButton}
            style={{marginBottom: "20px" }}
          >
            Add Health Package
          </Button>
        <Table data={data} columns={columns} />
      </div>

      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to unsubscribe?"
          confirmLabel="Yes"
          cancelLabel="No"
          onConfirm={handleDeleteHealthPackage}
          onCancel={() => setShowDeleteConfirmationDialog(false)}
        />
      )}
      {showEditOverlay && (
        <EditPackageOverlay
          id={selectedID}
          name={formData.name}
          price={formData.price}
          description={formData.description}
          doctorsDiscount={formData.doctorsDiscount}
          medicalDiscount={formData.medicalDiscount}
          familyDiscount={formData.familyDiscount}
          onCancel={() => {
            setShowEditOverlay(false);
            fetchAllHealthPackages();
          }}
        />
      )}
      {showAddOverlay && (
        <AddPackageOverlay
          onCancel={() => {
            setShowAddOverlay(false);
            fetchAllHealthPackages();
          }}
        />
      )}
    </div>

    </>
  );
};

export default HealthPackages;

import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import Table from "./table.jsx";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Avatar, Button, Modal, Tag } from "antd";
import styles from "./adminDeletePatient.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


const DeletePatient = () => {
  const [patients, setAllPatients] = useState([]);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [result, setResult] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  // Function to fetch all health packages
  const fetchAllPatients = async () => {
    try {
      const patientResponse = await fetch(
        "http://localhost:4000/patients/getAllPatients"
      );
      if (!patientResponse.ok) {
        throw new Error("Failed to fetch data");
      }
      const patientData = await patientResponse.json();
      console.log(patientData.data.patients);
      setAllPatients(patientData.data.patients);
    } catch (err) {
      //setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllPatients();
  }, []);

  
  const actions = (patients) => (
    <div className={styles.buttonsList}>
      <Button
        onClick={() => {
          console.log(patients.name + "<<<<<<");
          setSelectedID(patients._id);
          setUsername(patients.username);
          setRole(patients.role);
          setShowDeleteConfirmationDialog(true);
        }}
        shape="circle"
        danger
        icon={<DeleteOutlined />}
        className={styles.deleteButton}
      />
    </div>
  );

  
  const data = patients.map((patients) => ({
    username: patients.username,
    name: patients.name,
    email: patients.email,
    gender: patients.gender,
    mobilenumber: patients.mobileNumber,
  }));

  
  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "username",
      dataIndex: "username",
      title: "Username",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Gender",
    },
    {
      key: "mobilenumber",
      dataIndex: "mobilenumber",
      title: "Mobile Number",
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, healthPackage) => actions(healthPackage),
    },
  ];

  
  const handleDelete = async () => {
    try {
      const response = await axios.delete("http://localhost:4000/admins", {
        data: { role: "patient", name: username },
      });

      setResult(response.data.message);
      setShowDeleteConfirmationDialog(false);
      fetchAllPatients();
    } catch (error) {
      setResult(error.response.data.error);
    }
  };

  return (
    <div className={styles.packageAdminContainer}>
      <h2>Manage Patients</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <h3 className={styles.packagesListHeading}>Patients List</h3>{" "}
        <Table data={data} columns={columns} />
      </div>

      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this Patient?"
          confirmLabel="Yes"
          cancelLabel="No"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmationDialog(false)}
        />
      )}
    </div>
  );
};

export default DeletePatient;

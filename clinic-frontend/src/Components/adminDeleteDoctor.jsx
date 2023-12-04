import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import Table from "./table.jsx";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Avatar, Button, Modal, Tag } from "antd";
import styles from "./adminDeleteDoctor.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const DeleteDoctor = () => {
  const [doctors, setAllDoctors] = useState([]);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [result, setResult] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/doctors/viewAllDoctors"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data.data.doctors);
      setAllDoctors(data.data.doctors);
    } catch (err) {
      //setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllDoctors();
  }, []);

  const actions = (doctors) => (
    <div className={styles.buttonsList}>
      <Button
        onClick={() => {
          console.log(doctors.name + "<<<<<<");
          setSelectedID(doctors._id);
          setUsername(doctors.username);
          setRole(doctors.role);
          setShowDeleteConfirmationDialog(true);
        }}
        shape="circle"
        danger
        icon={<DeleteOutlined />}
        className={styles.deleteButton}
      />
    </div>
  );

  const data = doctors.map((doctors) => ({
    username: doctors.username,
    name: doctors.name,
    email: doctors.email,
    gender: doctors.gender,
    speciality: doctors.speciality,
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
      key: "speciality",
      dataIndex: "speciality",
      title: "Speciality",
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
        data: { role: "doctor", name: username },
      });

      setResult(response.data.message);
      setShowDeleteConfirmationDialog(false);
      fetchAllDoctors();
    } catch (error) {
      setResult(error.response.data.error);
    }
  };

  return (
    <div className={styles.packageAdminContainer}>
      <h2>Manage Doctors</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <h3 className={styles.packagesListHeading}>Doctors List</h3>{" "}
        <Table data={data} columns={columns} />
      </div>

      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to Delete this Doctor?"
          confirmLabel="Yes"
          cancelLabel="No"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmationDialog(false)}
        />
      )}
    </div>
  );
};

export default DeleteDoctor;

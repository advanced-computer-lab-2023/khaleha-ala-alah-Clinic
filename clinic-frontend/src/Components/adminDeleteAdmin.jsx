import React, { useState, useEffect } from "react";
import styles from "./packages.module.css";
import Table from "./table.jsx";
import { Avatar, Button, Modal, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import EditPackageOverlay from "./editPackageAdminOverlay.jsx";
import { PlusOutlined } from "@ant-design/icons";
import AddPackageOverlay from "./AddHealthPackageOverlay.jsx";

const HealthPackages = () => {
  const [admins, setAllAdmins] = useState([]);
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
  const fetchAllAdmins = async () => {
    try {
      const response = await fetch("http://localhost:4000/admins/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllAdmins(data.data.admins);
      console.log(data.data.admins);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllAdmins();
  }, []);

  return <div></div>;
};

export default HealthPackages;

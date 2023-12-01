import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { message, Spin, Card, Table,Tooltip } from "antd";
import { FilePdfOutlined, EditOutlined,CheckCircleOutlined,DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Buffer } from "buffer";
import UpdatePrescriptionForm from "../Elements/updatePrescriptionForm";

const DrViewPrescriptions = () => {
  const location = useLocation();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/doctors/viewPrescriptions",
          {
            patient: location.state.patient,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        message.error("Failed to fetch prescriptions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [location.state.patient.userID]);

  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "medicine",
      key: "medicine",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
    },
  ];

  const openPDF = (prescription) => {
    if (prescription.fileData) {
      const pdfBlob = new Blob([Buffer.from(prescription.fileData, "base64")], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");
    }
  };
  const downloadPDF = (prescription) => {
    if (prescription.fileData) {
      const pdfBlob = new Blob([Buffer.from(prescription.fileData, "base64")], {
        type: "application/pdf",
      });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(pdfBlob);
      a.download = "prescription.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleEditPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowUpdateForm(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>DrViewPrescriptions</h1>
      {loading ? (
        <Spin />
      ) : (
        prescriptions.map((prescription) => (
          <Card
            key={prescription._id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  Date: {new Date(prescription.date).toLocaleDateString()}
                  {(prescription.isFilled===true) && (
                    <Tooltip title="Prescription Filled">
                    <CheckCircleOutlined style={{ color: "green", marginLeft: "3px" }} />
                  </Tooltip>
                  )}
                </div>
                {prescription.pdfFileID && (
                  <div >
                    <Tooltip title="Open PDF">
                    <FilePdfOutlined
                      style={{ cursor: "pointer", color: "#1890ff", marginRight: "10px" }}
                      onClick={() => openPDF(prescription)}
                    />
                    </Tooltip>
                    <Tooltip title="Download PDF">
                      <DownloadOutlined
                        style={{ cursor: "pointer", color: "#1890ff",marginRight: "10px" }}
                        onClick={() => downloadPDF(prescription)}
                      />
                    </Tooltip>
                    <Tooltip title="Edit Prescription">
                        <EditOutlined
                        style={{ cursor: "pointer", color: "#1890ff" }}
                        onClick={() => handleEditPrescription(prescription)}
                        />
                     </Tooltip>
                  </div>
                )}
                
              </div>
            }
            style={{ marginBottom: "20px" }}
          >
            <Table dataSource={prescription.medications} columns={columns} pagination={false} />
          </Card>
        ))
      )}

      {showUpdateForm && (
        <UpdatePrescriptionForm
          prescription={selectedPrescription}
          visible={showUpdateForm}
          onClose={() => setShowUpdateForm(false)}
          onSuccess={() => {
            setShowUpdateForm(false);
            window.location.reload();
            }}
        />
      )}
    </div>
  );
};

export default DrViewPrescriptions;

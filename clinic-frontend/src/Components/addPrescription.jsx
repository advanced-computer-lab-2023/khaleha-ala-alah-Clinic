import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { message, Spin } from "antd";
import axios from "axios";

const AddPrescription = () => {
  const location = useLocation();
  const [medications, setMedications] = useState([{ medicine: "", dosage: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      // You can perform additional actions when loading starts, if needed.
    } else {
      setMedications([{ medicine: "", dosage: "" }]);
    }
  }, [loading]);

  const handleInputChange = (index, field, value) => {
    setMedications((prevMedications) => {
      const updatedMedications = [...prevMedications];
      updatedMedications[index][field] = value;
      return updatedMedications;
    });
  };

  const handleAddMedicine = () => {
    setMedications((prevMedications) => [
      ...prevMedications,
      { medicine: "", dosage: "" },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    setMedications((prevMedications) => {
      const updatedMedications = [...prevMedications];
      updatedMedications.splice(index, 1);
      return updatedMedications;
    });
  };

  const isMedicineValid = (medicine) => {
    return medicine.trim() !== "";
  };

  const canSubmit = () => {
    return medications.some((medication) => isMedicineValid(medication.medicine));
  };

  const handleAddPrescription = () => {
    // Filter out entries with an empty medicine field
    const validMedications = medications.filter(
      (medication) => isMedicineValid(medication.medicine)
    );

    if (!canSubmit()) {
      message.error("Please add at least one medicine before submitting.");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:4000/doctors/addPrescription", {
        patient: location.state.patient,
        medications: validMedications,
      },  {
        responseType: 'arraybuffer', 
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    
        message.success("Prescription added successfully.");
      })
      .catch((error) => {
        console.log("Error adding prescription:", error);
        message.error("Failed to add prescription. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h2>Add Prescription</h2>
      <form>
        <label>
          Medications:
          {medications.map((medication, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Medicine"
                value={medication.medicine}
                onChange={(e) => handleInputChange(index, "medicine", e.target.value)}
              />
              <input
                type="text"
                placeholder="Dosage"
                value={medication.dosage}
                onChange={(e) => handleInputChange(index, "dosage", e.target.value)}
                disabled={!isMedicineValid(medication.medicine)}
              />
              <button type="button" onClick={() => handleRemoveMedicine(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddMedicine}>
            + Add Medicine
          </button>
        </label>
        <br />
        <button type="button" onClick={handleAddPrescription}>
          {loading ? <Spin /> : "Add Prescription"}
        </button>
      </form>
    </>
  );
};

export default AddPrescription;

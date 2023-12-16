import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input, message, Select, Spin } from "antd";
import axios from "axios";
import styles from "./addPrescription.module.css";
import LoadingPage from "./LoadingPage";

const AddPrescription = ({ patient = null, onCancel }) => {
  const location = useLocation();
  const [medications, setMedications] = useState([
    { medicine: "", dosage: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [allMedicines, setAllMedicines] = useState([]);

  useEffect(() => {
    fetchAllMedicines();
    setMedications([{ medicine: "", dosage: "" }]);
    setLoading(false);
  }, [loading]);

  const fetchAllMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/patients/allMediciness",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data.medicines);
      setAllMedicines(response.data.data.medicines);
      //setMedications(response.data.medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      message.error("Failed to fetch medicines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    console.log(value);
    console.log("&92473240");
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
    return medications.some((medication) =>
      isMedicineValid(medication.medicine)
    );
  };

  const handleAddPrescription = () => {
    // Filter out entries with an empty medicine field
    const validMedications = medications.filter((medication) =>
      isMedicineValid(medication.medicine)
    );

    if (!canSubmit()) {
      message.error("Please add at least one medicine before submitting.");
      return;
    }

    setLoading(true);

    axios
      .post(
        "http://localhost:4000/doctors/addPrescription",
        {
          patient: patient,
          medications: validMedications,
        },
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

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

  const handleBackdropClick = (e) => {
    console.log(onCancel);
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      style={{ padding: "20px" }}
      className={styles.confirmationBackdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.confirmationDialog}>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <h2>Add Prescription</h2>
            <form>
                {medications.map((medication, index) => (
                  <div className={styles.ContainerAddPres} key={index}>
                    <Select
                      style={{ width: "400px" , marginRight:"5px"}}
                      placeholder="Choose Medicine"
                      onChange={(e) => handleInputChange(index, "medicine", e)}
                    >
                      {allMedicines.map((medicine) => (
                        <Select.Option
                          key={medicine._id}
                          value={medicine.name}
                          onClick={(e) =>
                            handleInputChange(index, "medicine", e)
                          }
                        >
                          {medicine.name}
                        </Select.Option>
                      ))}
                    </Select>
                    <Input
                      type="text"
                      placeholder="Dosage"
                      value={medication.dosage}
                      onChange={(e) =>
                        handleInputChange(index, "dosage", e.target.value)
                      }
                      disabled={!isMedicineValid(medication.medicine)}
                      style={{marginRight:"5px"}}
                    />

                    <button
                      type="button"
                      className={styles.ButtonForRemoveMed}
                      onClick={() => handleRemoveMedicine(index)}
                      style={{marginBottom:"3px" , height:"27px"}}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.ButtonForAddMed}
                  onClick={handleAddMedicine}
                >
                  Add Medicine
                </button>
              <br />
              <button
                type="button"
                className={styles.ButtonForAddPres}
                onClick={handleAddPrescription}
              >
                {loading ? <LoadingPage /> : "Add Prescription"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPrescription;

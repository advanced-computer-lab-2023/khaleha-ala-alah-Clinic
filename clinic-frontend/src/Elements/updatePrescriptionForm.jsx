import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Spin } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"; 
import axios from "axios";

const UpdatePrescriptionForm = ({ prescription, visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      medications: prescription.medications.map((medication) => ({
        medicine: medication.medicine,
        dosage: medication.dosage,
      })),
    });
  }, [prescription, form]);

  const handleAddMedicine = () => {
    form.setFieldsValue({
      medications: [
        ...(form.getFieldValue("medications") || []),
        { medicine: "", dosage: "" },
      ],
    });
  };

  const handleRemoveMedicine = (index) => {
    const medications = form.getFieldValue("medications");
    if (medications.length > 1) {
      form.setFieldsValue({
        medications: [...medications.slice(0, index), ...medications.slice(index + 1)],
      });
    }
  };

  const canSubmit = () => {
    const medications = form.getFieldValue("medications") || [];
    if (medications.length === 0) {
      return false;
    }
    return medications.every(
      (medication) =>
        medication &&
        isMedicineValid(medication.medicine) &&
        (!medication.medicine || isMedicineValid(medication.dosage))
    );
  };

  const isMedicineValid = (medicine) => {
    return medicine && medicine.trim() !== "";
  };

  const handleUpdatePrescription = () => {
    const medications = form.getFieldValue("medications") || [];
    const validMedications = medications.filter(
      (medication) => medication && isMedicineValid(medication.medicine)
    );
    form.setFieldsValue({ medications: validMedications });

    if (!canSubmit()) {
      message.error("Please enter valid data for all medicines.");
      return;
    }

    setLoading(true);

    axios
      .post(
        `http://localhost:4000/doctors/updatePrescription`,
        {
          prescriptionObject: prescription,
          medications: validMedications,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        message.success("Prescription updated successfully.");
        setTimeout(() => {
          onSuccess();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating prescription:", error);
        message.error("Failed to update prescription. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Check if the prescription is filled
  const isPrescriptionFilled = prescription && prescription.isFilled===true;

  return (
    <Modal
      title={`Update Prescription ${isPrescriptionFilled ? "- Filled" : ""}`}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdatePrescription}>
          {loading ? <Spin /> : "Update Prescription"}
        </Button>,
      ]}
    >
      {isPrescriptionFilled && (
        <div style={{ marginBottom: 16, textAlign: "center" }}>
          <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
          Prescription Filled
        </div>
      )}
      <Form form={form} layout="vertical">
        <Form.List name="medications" rules={[{ required: true, message: 'Please add at least one medicine.' }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'medicine']}
                    fieldKey={[fieldKey, 'medicine']}
                    label="Medicine"
                    style={{ marginRight: 8, flex: 1 }}
                  >
                    <Input
                      placeholder="Medicine"
                      onChange={(e) => {
                        if (!isPrescriptionFilled) {
                          const newMedications = form.getFieldValue("medications").map((medication, index) => {
                            if (index === name) {
                              return { ...medication, medicine: e.target.value, dosage: "" };
                            }
                            return medication;
                          });
                          form.setFieldsValue({ medications: newMedications });
                        }
                      }}
                      disabled={isPrescriptionFilled}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'dosage']}
                    fieldKey={[fieldKey, 'dosage']}
                    label="Dosage"
                    rules={[
                      { required: isMedicineValid(form.getFieldValue(['medications', name, 'medicine'])), message: 'Please enter the dosage.' },
                    ]}
                    style={{ marginRight: 8, flex: 1 }}
                  >
                    <Input
                      placeholder="Dosage"
                      disabled={!form.getFieldValue(['medications', name, 'medicine'])}
                      onChange={(e) => {
                          const newMedications = form.getFieldValue("medications").map((medication, index) => {
                            if (index === name) {
                              return { ...medication, dosage: e.target.value };
                            }
                            return medication;
                          });
                          form.setFieldsValue({ medications: newMedications });
                      }}
                    />
                  </Form.Item>
                  {!isPrescriptionFilled && (
                    <Button type="ghost" danger onClick={() => handleRemoveMedicine(name)} disabled={fields.length === 1}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {!isPrescriptionFilled && (
                <Button type="dashed" onClick={() => add()} block>
                  Add Medicine
                </Button>
              )}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default UpdatePrescriptionForm;

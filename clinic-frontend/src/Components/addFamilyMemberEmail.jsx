import React, { useState } from "react";
import axios from "axios";
import FeedbackMessage from "./feedbackMessage";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import styles from './addFamilyMemberUsing.module.css';

const AddFamilyMember = () => {
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState(""); // New state for relation
  const [feedback, setShowFeedback] = useState(false); // New state for relation
  const [feedbackMessage, setShowFeedbackMessage] = useState(""); // New state for relation
  const [feedbackType, setShowFeedbackType] = useState(""); // New state for relation
  const [isLoading, setIsLoading] = useState(false); // New state for relation

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRelationChange = (e) => {
    setRelation(e.target.value);
  };

  const handleAddFamilyMember = async () => {
    if (email === "" || relation === "" || relation === "Select Relation") {
      setShowFeedbackType("warning");
      setShowFeedbackMessage("Please fill all fields");
      setShowFeedback(true);
      return;
    }
    setIsLoading(true);
    try {
      // Your API endpoint
      const apiUrl = "http://localhost:4000/patients/addFamilyMemberUsingEmail";

      // Request body
      const requestBody = {
        email: email,
        relationToPatient: relation,
      };

      // Custom headers
      const customHeaders = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      // Make the PATCH API request
      const response = await axios.patch(apiUrl, requestBody, {
        headers: customHeaders,
      });
      console.log(response.status);
      setShowFeedbackMessage("Family member added successfully");
      setShowFeedbackType("success");
      setShowFeedback(true);

      // Handle the response as needed
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error adding family member:", error);

      if (error.response.data.status === "fail") {
        if (error.response.data.message === "Family member not found") {
          setShowFeedbackMessage("Family member not found");
          setShowFeedbackType("error");
          setShowFeedback(true);
        } else {
          setShowFeedbackMessage("Family member already added");
          setShowFeedbackType("warning");
          setShowFeedback(true);
        }
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div>Loading...</div>
          {feedback && (
            <FeedbackMessage
              type={feedbackType}
              message={feedbackMessage}
              onClose={() => {
                setShowFeedback(false);
                setShowFeedbackMessage("");
                setShowFeedbackType("");
                setIsLoading(false);
              }}
            />
          )}
        </>
      ) : (
        <>
        <div>
        <Header />
        <NavBar/>
        
          <div className={styles.addfamMemUsingCon}>
            <p className={styles.pText}>
              Please enter the email of your family member
            </p>
            <p className={styles.pText} style={{marginBottom:'2rem'}}>
              This family member must be a member in our clinic.
            </p>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
            />
            <div >
              <label htmlFor="relation" className={styles.label}>Relation</label>
              <select
                id="relation"
                value={relation}
                onChange={handleRelationChange}
                className={styles.select}
              >
                <option value="">Select Relation</option>
                <option value="husband">Husband</option>
                <option value="wife">Wife</option>
                <option value="children">Children</option>
              </select>
            </div>
            <button onClick={handleAddFamilyMember} className={styles.button}>
             + Add Member
            </button>
            {feedback && (
              <FeedbackMessage
                type={feedbackType}
                message={feedbackMessage}
                onClose={() => {
                  setShowFeedback(false);
                  setShowFeedbackMessage("");
                  setShowFeedbackType("");
                  setIsLoading(false);
                }}
              />
            )}
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddFamilyMember;

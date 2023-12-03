import React from "react";
import "./packageManagment.css"; // Your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ManagePackages = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateTo = (path) => {
    navigate(path); // Call navigate with the path
  };
  const [isLoading, setIsLoading] = useState(false);

  //const [status, setStatus] = useState({});

  return (
    <div className="manage-packages">
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <div style={{ marginBottom: "50px" }}>
            <Header />
            <NavBar
              selectedSection={"familyMembers"}
              selectedSubSection="addFamilyMember"
            />
          </div>
          <h1 className="title">Add Family Member Using </h1>

          <div
            className="card"
            onClick={() => navigateTo("/registerFamilyMember")}
          >
            <h2>National Id Number</h2>
            <p>Description...</p>
          </div>
          <div
            className="card"
            onClick={() => navigateTo("/addFamilyMemberUsingEmail")}
          >
            <h2>Email</h2>
            <p>
              Description for family
              packagesgpjfioghprehvpioerhverhogvheovheriohtvoiwhetois...
            </p>
          </div>
          <div
            className="card"
            onClick={() => navigateTo("/addFamilyMemberUsingPhone")}
          >
            <h2>Phone Number</h2>
            <p>
              Description for family
              packagesgpjfioghprehvpioerhverhogvheovheriohtvoiwhetois...
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePackages;

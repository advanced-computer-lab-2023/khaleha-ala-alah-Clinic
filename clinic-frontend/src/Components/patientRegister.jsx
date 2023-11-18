import React from "react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./patientRegister.css";

export const PatientRegister = () => {
  const { role } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      switch (role) {
        case "patient":
          navigate("/patientHome");
          break;
        case "doctor":
          navigate("/doctorHome");
          break;
        case "admin":
          navigate("/adminHome");
          break;
        default:
          navigate("/");
      }
    }
  }, [role, navigate]);
  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles([...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !dateOfBirth ||
      !gender ||
      !mobileNumber ||
      !emergencyName ||
      !emergencyNumber
    ) {
      message.error("Please fill all the fields");
      return;
    }
    // const data = {
    //   username: username,
    //   password: password,
    //   email: email,
    //   name: name,
    //   dateOfBirth: dateOfBirth,
    //   gender: gender,
    //   mobileNumber: mobileNumber,
    //   emergencyName: emergencyName,
    //   emergencyNumber: emergencyNumber,
    // };
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("email", email);
    data.append("name", name);
    data.append("dateOfBirth", dateOfBirth);
    data.append("gender",gender);
    data.append("mobileNumber", mobileNumber);
    data.append("emergencyName", emergencyName);
    data.append("emergencyNumber", emergencyNumber);
    for (let i = 0; i < selectedFiles.length; i++) {
      data.append("files", selectedFiles[i]);
    }
    await axios
      .post("http://localhost:4000/users/register", data, {
        headers: {
          role: "patient",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        const token = res.data.token;
        await localStorage.setItem("token", token);
        message.success("Registration Successful");
        window.location.replace("/verifyUser");
      })
      .catch((err) => {
        console.log(err);
        message.error("Registration Failed");
      });
  };

  return (
    <div className="register">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@email.com"
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number"
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="*****"
                />
              </div>
              <div className="input-box">
                <span className="details">Date Of Birth</span>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span htmlFor="gender" className="details">
                  Gender
                </span>
                <select
                  name="gender"
                  id="gender"
                  className="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="title2">Emergency Contact</div>
            <div className="user-details">
              <div className="input-box">
                <span htmlFor="fullnameEC" className="details">
                  Full Name
                </span>
                <input
                  type="text"
                  name="emergencyName"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="input-box">
                <span htmlFor="phoneNrEC" className="details">
                  Phone Number
                </span>
                <input
                  type="text"
                  name="emergencyNumber"
                  value={emergencyNumber}
                  onChange={(e) => setEmergencyNumber(e.target.value)}
                  placeholder="Mobile Number"
                />
              </div>
              {/* upload files */}
              <div className="input-box">
                <span className="details">Upload File(s)</span>
                <input
                  type="file"
                  name="file"
                  accept=".pdf, .jpg, .png" // Specify allowed file types
                  multiple // Allow multiple file selection
                  onChange={handleFileSelect}
                />
            </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
        <Link to="/login">Already have an account</Link>
      </div>
    </div>
  );
};

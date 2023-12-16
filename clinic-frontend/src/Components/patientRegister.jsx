import React from "react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import styles from './patientRegister.module.css';

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
    <div>
          <form onSubmit={handleSubmit} className={styles.Bigcontainer}>
          <div className={styles.addMedicinecontainer}> 
            <div className={styles.inputContainer}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Name"
              />
            </div>

              <div className={styles.inputContainer}>
              <label className={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Username"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
              <label className={styles.label}>Email</label>
                <input
                   type="email"
                   name="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="example@gmail.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
              <label className={styles.label}>Phone Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Phone Nr"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
              <label className={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
              <label className={styles.label}>Date Of Birth</label>
                <input
                   type="date"
                   name="dateOfBirth"
                   value={dateOfBirth}
                   onChange={(e) => setDateOfBirth(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                  <label htmlFor="gender" className={styles.label}>
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className={styles.input}  
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
               </div>
               </div>

            <div><h2 className={styles.h2Style}>Emergancy Contact</h2></div>
            <div className={styles.addMedicinecontainer}> 
              <div className={styles.inputContainer}>
              <label  htmlFor="fullnameEC" className={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="emergencyName"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="Name"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
              <label  htmlFor="phoneNrEC" className={styles.label}>Phone Number</label>
                <input
                    type="text"
                    name="emergencyNumber"
                    value={emergencyNumber}
                    onChange={(e) => setEmergencyNumber(e.target.value)}
                    placeholder="Mobile Number"
                  className={styles.input}
                />
              </div>
                
             <div className={styles.inputContainer}>
              <label className={styles.label}>Upload File</label>
                <input
                    type="file"
                    name="file"
                    accept=".pdf, .jpg, .png" // Specify allowed file types
                    multiple // Allow multiple file selection
                    onChange={handleFileSelect}
                  className={styles.input}
                />
              </div>
            </div>
            <div><Link to="/login">Already have an account</Link></div>
            <div>
              <button type="submit" className={styles.button}>
                  Register
              </button>
            </div>
            <div><Link to="/login">Already have an account</Link></div>
        </form>
    </div>
  );
};

import React, { useState } from "react";
import { message } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import ContractComponent from "./Contract";

export const DoctorRegister = () => {
  const { role } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedhour, setSelectedhour] = useState("");
  const [fixedSlots, setFixedSlots] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [agreedToContract, setAgreedToContract] = useState(false); 
  const [showContract, setShowContract] = useState(false);
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

  const closeContract = () => {
    setShowContract(false);
  };
  const handleAddSlot = () => {
    if (!selectedDay || !selectedhour) {
      message.error("Please select a day and hour for the slot");
      return;
    }
    const newSlot = { day: selectedDay, hour: selectedhour };
    for (let i = 0; i < fixedSlots.length; i++) {
      if (
        fixedSlots[i].day === newSlot.day &&
        fixedSlots[i].hour === newSlot.hour
      ) {
        message.error("This slot already exists");
        return;
      }
    }
    setFixedSlots([...fixedSlots, newSlot]);
    setSelectedDay("");
    setSelectedhour("");
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = [...fixedSlots];
    updatedSlots.splice(index, 1);
    setFixedSlots(updatedSlots);
  };
  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles([...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToContract) {
      message.error("Please agree to the contract before registering.");
      return;
    }
    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !birthdate ||
      !hourlyRate ||
      !affiliation ||
      !speciality ||
      !educationalBackground ||
      fixedSlots.length === 0
    ) {
      message.error("Please fill all the fields and add at least one slot");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("birthdate", birthdate);
    formData.append("hourlyRate", hourlyRate);
    formData.append("affiliation", affiliation);
    formData.append("speciality", speciality);
    formData.append("educationalBackground", educationalBackground);
    formData.append("fixedSlots", JSON.stringify(fixedSlots));
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
  

    await axios
      .post("http://localhost:4000/users/register", formData, {
        headers: {
          role: "doctor",
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
                <span className="details">hourly rate</span>
                <input
                  type="text"
                  name="hourlyRate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="hourly rate"
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
                  name="birthdate"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="details">affiliation</span>
                <input
                  type="affiliation"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  name="affiliation"
                  placeholder="affiliation"
                />
              </div>
              <div className="input-box">
                <span className="details">speciality</span>
                <input
                  type="speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  name="speciality"
                  placeholder="speciality"
                />
              </div>
              <div className="input-box">
                <span className="details">educationalBackground</span>
                <input
                  type="educationalBackground"
                  value={educationalBackground}
                  onChange={(e) => setEducationalBackground(e.target.value)}
                  name="educationalBackground"
                  placeholder="educationalBackground"
                />
              </div>
              <div className="input-box">
                <label htmlFor="day" className="details">
                  Select Day
                </label>
                <select
                  id="day"
                  name="day"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="select"
                >
                  <option value="">Select day</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  {/* Add more day options as needed */}
                </select>
              </div>
              <div className="input-box">
                <label htmlFor="hour" className="details">
                  Select hour
                </label>
                <select
                  id="hour"
                  name="hour"
                  value={selectedhour}
                  onChange={(e) => setSelectedhour(e.target.value)}
                  className="select"
                >
                  <option value="">Select hour</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>

                  {/* Add more hour options as needed */}
                </select>
              </div>
              <div className="slot-buttons">
                <button
                  type="button"
                  className="add-slot-button"
                  onClick={handleAddSlot}
                >
                  Add Slot
                </button>
              </div>
              <div className="fixed-slots">
                {fixedSlots.map((slot, index) => (
                  <div key={index} className="fixed-slot">
                    <span>
                      {slot.day} - {slot.hour}
                    </span>
                    <button
                      type="button"
                      className="remove-slot-button"
                      onClick={() => handleRemoveSlot(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
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
          <div className="input-box">
              <label>
              <button onClick={() => setShowContract(!showContract)}>
                View Contract
              </button>
                <input
                  type="checkbox"
                  checked={agreedToContract}
                  onChange={() => {
                    setAgreedToContract(!agreedToContract);
                  }}
                />
                I agree to the terms of the contract
              </label>
              
            </div>

            { showContract && (
              <div className="contract-container">
                <h1 className="contract-title">Employment Contract</h1>
                <pre className="contract-text">
                  {`
                    EMPLOYMENT CONTRACT AGREEMENT

                    THIS EMPLOYMENT CONTRACT (the "Contract") is made and entered into by and between [Hospital Name], a [Type of Entity] ("Employer"), and [Employee Name] ("Employee") collectively referred to as the "Parties."

                    1. POSITION AND RESPONSIBILITIES:
                    1.1 Employee agrees to be employed as a [Position] and will perform the following responsibilities: [List of Responsibilities].
                    1.2 Employee will report directly to [Supervisor's Name] and collaborate with other team members.

                    2. SALARY AND BENEFITS:
                    2.1 Employer agrees to pay Employee a monthly salary of $10,000, payable on the [Payment Schedule].
                    2.2 Employee will be eligible for health benefits, retirement plans, and other benefits as outlined in the employee handbook.

                    3. DURATION OF EMPLOYMENT:
                    3.1 The term of this Contract shall commence on [Start Date] and continue for a period of 12 months, terminating on [End Date].
                    3.2 Either party may terminate this Contract with a notice period of [Notice Period] days for any reason.

                    ...

                    10. ACCEPTANCE:
                    10.1 Employee may accept or reject this Contract by clicking the respective buttons below.
                    10.2 By accepting this Contract, Employee acknowledges understanding and agrees to abide by the terms and conditions outlined herein.
                  `}
                </pre>
                <div className="button-container">
                  <button className="close-button" onClick={closeContract}>
                    close
                  </button>
                  
                </div>
              </div>
            )}
          
        </div>
        <Link to="/login">Already have an account</Link>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { message } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import ContractComponent from "./Contract";
import styles from "./doctorRegister.module.css";

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
    <div >
          <form onSubmit={handleSubmit}className={styles.Bigcontainer}>
          <div className={styles.addMedicinecontainer}>

              <div className={styles.inputContainer}>
                  <label className={styles.label}>Full Name</label>
                  <input
                     type="text"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Name"
                    className={styles.input}
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
                       name="birthdate"
                       value={birthdate}
                       onChange={(e) => setBirthdate(e.target.value)}
                      className={styles.input}
                    />
                  </div>          

                  <div className={styles.inputContainer}>
                  <label className={styles.label}>Hourly Rate</label>
                    <input
                      type="text"
                      name="hourlyRate"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="hourly rate"
                      className={styles.input}
                    />
                  </div>
                
                  <div className={styles.inputContainer}>
                  <label className={styles.label}>Affiliation</label>
                    <input
                         type="affiliation"
                         value={affiliation}
                         onChange={(e) => setAffiliation(e.target.value)}
                         name="affiliation"
                         placeholder="affiliation"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                  <label className={styles.label}>Speciality</label>
                    <input
                        type="speciality"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        name="speciality"
                        placeholder="speciality"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                  <label className={styles.label}>Educational Background</label>
                    <input
                       type="educationalBackground"
                       value={educationalBackground}
                       onChange={(e) => setEducationalBackground(e.target.value)}
                       name="educationalBackground"
                        placeholder="Educational Background"
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

              <div><h2 className={styles.h2Style}>Add Your Slots</h2></div>
              <div className={styles.addMedicinecontainer}>
              <div className={styles.inputContainer}>
                  <label htmlFor="day" className={styles.label}>
                  Select Day
                  </label>
                  <select
                   id="day"
                   name="day"
                   value={selectedDay}
                   onChange={(e) => setSelectedDay(e.target.value)}
                  className={styles.input}  
                  >
                    <option value="">Select day</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
               </div>

               <div className={styles.inputContainer}>
                  <label htmlFor="hour" className={styles.label}>
                  Select hour
                  </label>
                  <select
                  id="hour"
                  name="hour"
                  value={selectedhour}
                  onChange={(e) => setSelectedhour(e.target.value)}
                  className={styles.input}  
                  >
                   <option value="">Select hour</option>
                    <option value="9:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">01:00 PM</option>
                    <option value="2:00 PM">02:00 PM</option>
                    <option value="3:00 PM">03:00 PM</option>
                    <option value="4:00 PM">04:00 PM</option>
                  </select>
               </div>
              </div>

              

              <div>
                <button
                  type="button"
                  className={styles.addSlotBut}
                  onClick={handleAddSlot}
                >
                  Add Slot
                </button>
              </div>

              <div>
                {fixedSlots.map((slot, index) => (
                  <div key={index} >
                    <button
                      type="button"
                      className={styles.removeBut}
                      onClick={() => handleRemoveSlot(index)}
                    >
                      Remove
                    </button>
                    <label className={styles.timing}>
                      {slot.day} - {slot.hour}
                    
                      </label>
                    
                  </div>
                ))}
              </div>

          <div>
          <label className={styles.label}>
              <button onClick={() => setShowContract(!showContract)} children className={styles.buttonContract}>
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
                <div>
                  <button className={styles.removeBut} onClick={closeContract}>
                    close
                  </button>
                </div>
              </div>
            )}

          
        <div><Link to="/login">Already have an account</Link></div>
        <div>
              <button type="submit" className={styles.button}>
                  Register
              </button>
            </div>
        </form>
      </div>
  );
};

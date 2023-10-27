import { message } from "antd";
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../AuthContext";

export const Login = () => {
    const {role}=useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

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
          case "notVerified":
            navigate("/verifyUser");
            break;
          default:
            navigate("/"); 
        }
      }
    }, [role, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !password){
           message.error("Please fill all the fields");
            return;
        }
        const data = {
            "username" : username,
            "password" : password
        }
        await axios.post("http://localhost:4000/users/login",data)
        .then(async (res) => {
            const token = res.data.token;
            const role = res.data.role;
            await localStorage.setItem("token",token);
            message.success("Login Successfull");
            if(role==="patient"){
               window.location.replace("/patientHome");
              }else if(role==="doctor"){
                window.location.replace("/doctorHome");
              }else if(role==="admin"){
                window.location.replace("/adminHome");
              }
        }).catch(async (err) => {
            console.log(err.response.data.error);
            if(err.response.data.error==="User not verified yet"){
              await localStorage.setItem("token",err.response.data.token);
              message.error("User not verified yet");
              window.location.replace("/verifyUser");
            }else{
              message.error("Invalid Credentials");
            }
        })        
    }
  return (
    <div className="login">
    <form className="login-form" onSubmit={handleSubmit} >
      <label>Username</label>
      <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} id="username" placeholder="Username" />
      <label>Password</label>
      <input type="password"  name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="*****"  />
      <button type="submit">Login</button>
    </form>
    <div className="patientRegister">
    <Link to="/patientRegister">Register as a patient</Link>
    </div>
    <div className="doctorRegister">
    <Link to="/DoctorRegister">Register as a doctor</Link>
    </div>
    <div className="forgotPassword">
    <Link to="/forgotPassword">Forgot Password</Link>
    </div>
  </div>
    
  );
}

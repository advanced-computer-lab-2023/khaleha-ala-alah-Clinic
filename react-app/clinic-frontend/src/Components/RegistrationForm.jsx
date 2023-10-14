import react from 'react';
import './registerForm.css';
import axios from 'axios';
import { message } from "antd";
import { useState } from 'react';


function RegisterFamilymember (){
    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [relation, setRelation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !nationalId || !age || !gender || !relation){
            message.error("All fields are required");
            return;
        }
        const data = {
            "name": name,
            "nationalId": nationalId,
            "age": age,
            "gender":gender,
            "relation":relation
        };
        await axios.patch("http://localhost:4000/patients/add-family-members", data)
        .then((res) => {
            console.log(res);
            message.success("Registration successful");
        }).catch((err) => {
            message.error("Registration failed");
        }
        );
    }




return(
    <div>
        <div class="container">
             <div class="title">Registration</div>
            <div class="content">
            <form action="#" onSubmit={handleSubmit}>
                 <div class="user-details">
                    <div class="input-box">
                     <span class="details">Full Name</span>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div class="input-box">
                <span class="details">National Identification Number</span>
                <input type="text" value={nationalId} onChange={(e)=>setNationalId(e.target.value)} placeholder="Enter your national id" />
            </div>
            <div class="input-box">
                <span class="details">Age</span>
                <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Enter your age" />
            </div>
            <div class="input-box">
                <span for="gender" class="details">Gender</span>
                <select id="gender" name="gender" value={gender} onChange={(e)=>setGender(e.target.value)} class="select" >
                    <option value="">select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select> 
            </div>
            <div class="input-box">
                <span for="relation" class="details">Relation</span>
                    <select id="relation" name="relation" value={relation} onChange={(e)=>setRelation(e.target.value)} class="select" >
                        <option value="">select relation</option>
                        <option value="Wife">Wife</option>
                        <option value="Husband">Husband</option>
                        <option value="Children">Children</option>
                    </select> 
            </div>
            </div>
        <div class="button">
            <input type="submit" value=" + Add Member"></input>
        </div>
    </form>
    </div>
  </div>
    </div>
)
}
export default RegisterFamilymember;
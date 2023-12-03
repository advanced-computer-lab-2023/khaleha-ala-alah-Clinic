import React, { useState } from 'react';
import './registerForm.css';
import axios from 'axios';
import { message } from 'antd';

function RegisterFamilymember() {
    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [relation, setRelation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !nationalId || !age || !gender || !relation) {
            message.error("All fields are required");
            return;
        }
        const data = {
            "name": name,
            "nationalID": nationalId,
            "gender": gender,
            "age": age,
            "relationToPatient": relation
        };
        await axios.patch("http://localhost:4000/patients/add-family-members", data, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                console.log(res);
                message.success("Registration successful");
            }).catch((err) => {
                console.log(err);
                message.error("Registration failed");
            });
    }

    return (
        <div>
            <div className="container">
                <div className="title">Registration</div>
                <div className="content">
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="user-details">
                            <div className="input-box">
                                <label htmlFor="name" className="details">Full Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="nationalId" className="details">National Identification Number</label>
                                <input type="text" id="nationalId" value={nationalId} onChange={(e) => setNationalId(e.target.value)} placeholder="Enter your national id" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="age" className="details">Age</label>
                                <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="gender" className="details">Gender</label>
                                <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="select">
                                    <option value="">select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label htmlFor="relation" className="details">Relation</label>
                                <select id="relation" name="relation" value={relation} onChange={(e) => setRelation(e.target.value)} className="select">
                                    <option value="">select relation</option>
                                    <option value="wife">wife</option>
                                    <option value="husband">husband</option>
                                    <option value="children">children</option>
                                </select>
                            </div>
                        </div>
                        <div className="button">
                            <input type="submit" value=" + Add Member" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterFamilymember;

import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBarDoctor";
import Header from "../Elements/HeaderDoctor";
import styles from './doctorEditAcc.module.css';

const DoctorEditProfileForm = () => {
  // Define state variables for the doctor's information
  const [email, setEmail] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the doctor's profile
      const response = await fetch('http://localhost:4000/doctors/update-email', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          email,
          hourlyRate,
          affiliation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Handle successful update, e.g., display a success message
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div >
      <Header/>
      <NavBar/>
      <form onSubmit={handleUpdateProfile} className={styles.addMedicinecontainer}>
        
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder='Email'/>
        </div>
       
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Affiliation</label>
          <input   type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}className={styles.inputToLeft} placeholder='Affiliation'/>
        </div>
        
        <div className={styles.inputContainer}>
          <label className={styles.label}>Hourly Rate</label>
          <input type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)} className={styles.input} placeholder='EGP' />
        </div>
        
        <button type="submit" className={styles.button}>Update Profile</button> 
      </form>
    </div>
  );
};

export default DoctorEditProfileForm;




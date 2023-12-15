import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Elements/NavBarDoctor';
import Header from '../Elements/HeaderDoctor';
import styles from './doctorEditAcc.module.css';

const DoctorEditProfileForm = () => {
  const [doctorData, setDoctorData] = useState({
    email: '',
    hourlyRate: '',
    affiliation: '',
    name: '',  // Add the missing fields
    speciality: '',  // Add the missing fields
    educationalBackground: '',  // Add the missing fields
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data if needed
  }, []);

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Send a PATCH request to update the doctor's profile
      const response = await axios.patch('http://localhost:4000/doctors/update-profile', doctorData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Handle successful update, e.g., display a success message
      console.log('Profile updated:', response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <NavBar />
      <form onSubmit={handleUpdateProfile} className={styles.Bigcontainer}>
        <div className={styles.addMedicinecontainer}> 
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Email"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Name</label>
          <input
            type="text"
            name="name"
            value={doctorData.name}
            onChange={handleChange}
            className={styles.inputToLeft}
            placeholder="Name"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Affiliation</label>
          <input
            type="text"
            name="affiliation"
            value={doctorData.affiliation}
            onChange={handleChange}
            className={styles.input}
            placeholder="Affiliation"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Educational Background</label>
          <input
            type="text"
            name="educationalBackground"
            value={doctorData.educationalBackground}
            onChange={handleChange}
            className={styles.inputToLeft}
            placeholder="Educational Background"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Speciality</label>
          <input
            type="text"
            name="speciality"
            value={doctorData.speciality}
            onChange={handleChange}
            className={styles.input}
            placeholder="Speciality"
          />
        </div>
 
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Hourly Rate</label>
          <input
            type="number"
            name="hourlyRate"
            value={doctorData.hourlyRate}
            onChange={handleChange}
            className={styles.inputToLeft}
            placeholder="EGP"
          />
        </div>


        </div>
        <div>
               <button type="submit" className={styles.button}>
          Update Profile
        </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorEditProfileForm;

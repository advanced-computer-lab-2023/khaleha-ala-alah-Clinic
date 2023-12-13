import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Elements/NavBarDoctor';
import Header from '../Elements/HeaderDoctor';
import styles from './doctorUserProfile.module.css';

const DoctorUserProfileForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    hourlyRate: '',
    birthDate: '',
    gender: '',
    mobileNumber: '',
    affiliation: '',
    educationalBackground: '',
    speciality: '',
    status: '',
    fixedSlots: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/doctors/1234', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data.data.doctor);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderUserDetail = (label, value) => (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}: {value}</label>
    </div>
  );

  const renderFixedSlots = (fixedSlots) => (
    <div className={styles.inputContainer}>
      <label className={styles.label}>Fixed Slots:</label>
      {fixedSlots.map((slot) => (
        <div key={slot._id}>
          <span>{`Day: ${slot.day}, Hour: ${slot.hour}`}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Header />
      <NavBar />

      {renderUserDetail('Username', userData.username)}
      {renderUserDetail('Name', userData.name)}
      {renderUserDetail('Email', userData.email)}
      {renderUserDetail('Birth Date', userData.birthdate)}
      {renderUserDetail('Educational Background', userData.educationalBackground)}
      {renderUserDetail('Mobile Number', userData.mobileNumber)}
      {renderUserDetail('Affiliation', userData.affiliation)}
      {renderUserDetail('Hourly Rate', userData.hourlyRate)}
      {renderUserDetail('Speciality', userData.speciality)}
      {renderUserDetail('Status', userData.status)}
      {renderFixedSlots(userData.fixedSlots)}
    </div>
  );
};

export default DoctorUserProfileForm;



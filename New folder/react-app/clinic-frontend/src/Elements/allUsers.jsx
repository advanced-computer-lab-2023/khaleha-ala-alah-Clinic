import React from 'react';
import { useAuth } from '../AuthContext';

const UserList = ({ users, onSelectUser }) => {
  const { role } = useAuth();

  const pharmacistsAndPatients = role === 'doctor' ? users : [];
  const doctors = role === 'patient' ? users : [];

  const hasPharmacists = pharmacistsAndPatients.some((user) => user.role === 'pharmacist');

  return (
    <div className="user-list">
      {(role === 'pharmacist' || role === 'doctor') && (
        <>
          <h2>Patients</h2>
          {pharmacistsAndPatients
            .filter((user) => user.role === undefined)
            .map((patient, index) => (
              <div
                key={index}
                className="user"
                onClick={() => onSelectUser(patient.userID)}
              >
                {patient.name}
              </div>
            ))}
        </>
      )}

      {role === 'doctor' && hasPharmacists && (
        <>
          <h2>pharmacist</h2>
          {pharmacistsAndPatients
            .filter((user) => user.role === 'pharmacist')
            .map((pharmacist, index) => (
              <div
                key={index}
                className="user"
                onClick={() => onSelectUser(pharmacist.userID)}
              >
                {pharmacist.name}
              </div>
            ))}
        </>
      )}

      {role === 'patient' && (
        <>
          <h2>Doctors</h2>
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="user"
              onClick={() => onSelectUser(doctor.userID)}
            >
              {doctor.name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;

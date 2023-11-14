// AvailableSlotsForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AvailableSlotsForm = () => {
  const [slots, setSlots] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSlotsChange = (e) => {
    setSlots(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/doctors/addAvaliableSlots', 
        { fixedSlots: JSON.parse(slots) },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage(`Error adding available slots: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Available Slots Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Available Slots:    
          <textarea value={slots} onChange={handleSlotsChange} />
        </label>
        <br />
        <button type="submit">Add Available Slots</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default AvailableSlotsForm;

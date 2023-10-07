
import classes from './PatientSignUp.module.css';
import React, { useState } from 'react';

function NewMeetupForm() {
    const [selectedGender, setSelectedGender] = useState(null);
    const handleGenderChange = (event) => {
      setSelectedGender(event.target.id);
    };
  return (
    <div className={classes.container}>
        <div className={classes.title}>Registration</div>
        <div className={classes.content}>
            <form >
                <div className={classes.userdetails}>
                    <div className={classes.inputBox}>
                        <label htmlFor='username' className={classes.title1}>User Name</label>
                        <input type='text' placeholder="Enter your username" required id='username' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='fullname' className={classes.title1}>Full Name</label>
                        <input type='text' placeholder="Enter your name" required id='fullname' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='email'className={classes.title1}>Email</label>
                        <input type='email' placeholder="Enter your email" required id='email' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='phoneNr'className={classes.title1}>Phone Number</label>
                        <input type='text' placeholder="Enter your number" required id='phoneNr' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='password'className={classes.title1}>Password</label>
                        <input type='text' placeholder="Enter your password" required id='password' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='address'className={classes.title1}>Address</label>
                        <input type='text' placeholder="Enter your address" required id='address' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='dateOfBirth'className={classes.title1}>Date Of Birth</label>
                        <input type='date' placeholder="Enter your Birth Date" required id='dateOfBirth' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor="gender" className={classes.title1}>Gender</label>
                        <select id="gender" name="gender" className={classes.select} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select> 
                    </div>
                </div>
                <div className={classes.title2}>Emergancy Contact</div>
                <div className={classes.userdetails}>
                    <div className={classes.inputBox}>
                        <label htmlFor='fullnameEC' className={classes.title1}>Full Name</label>
                        <input type='text' placeholder="Enter your name" required id='fullnameEC' />
                    </div>
                    <div className={classes.inputBox}>
                        <label htmlFor='phoneNrEC'className={classes.title1}>Phone Number</label>
                        <input type='text' placeholder="Enter your number" required id='phoneNrEC' />
                    </div> 
                    <div className={classes.inputBox}>
                        <label htmlFor="relation" className={classes.title1}>Relation</label>
                        <select id="relation" name="relation" className={classes.select} >
                            <option value="Wife">Wife</option>
                            <option value="Husband">Husband</option>
                            <option value="Children">Children</option>
                        </select> 
                    </div>
                </div>       
                <div className={classes.actions}>
                    <button>Register</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default NewMeetupForm;
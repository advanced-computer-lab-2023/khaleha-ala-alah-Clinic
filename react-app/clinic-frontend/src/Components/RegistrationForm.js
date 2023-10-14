import react from 'react';

import './registerForm.css';
import axios from './axios';

function RegisterFamilymember (){



return(
    <div>
        <div class="container">
             <div class="title">Registration</div>
            <div class="content">
            <form action="#">
                 <div class="user-details">
                    <div class="input-box">
                     <span class="details">Full Name</span>
                    <input type="text" placeholder="Enter your name" required></input>
            </div>
            <div class="input-box">
                <span class="details">National Identification Number</span>
                <input type="text" placeholder="Enter your national id" required></input>
            </div>
            <div class="input-box">
                <span class="details">Age</span>
                <input type="text" placeholder="Enter your age" required></input>
            </div>
            <div class="input-box">
                <span for="gender" class="details">Gender</span>
                <select id="gender" name="gender" class="select" >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select> 
            </div>
            <div class="input-box">
                <span for="relation" class="details">Relation</span>
                    <select id="relation" name="relation" class="select" >
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
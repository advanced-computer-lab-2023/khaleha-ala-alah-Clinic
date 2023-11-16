
const validateName = (name) => {
    if (!name || name.length < 3) {
        throw new Error('Name must be at least 3 characters long');
    }
    return name;
}

const validateEmail = (email) => {
    if (!email) {
        throw new Error('Email is required');
    }
    return email;
}

const validatePassword = (password) => {
    if (!password || password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    // Check if the password contains at least one capital letter
    if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one capital letter');
    }
    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
        throw new Error('Password must contain at least one digit');
    }
    return password;
};
const validateMobileNumber = (mobileNumber) => {
    if (!mobileNumber) {
        throw new Error('Mobile number must be at least 10 characters long');
    }
    return mobileNumber;
}
const validateRole = (role) => {
    if (!role) {
        throw new Error('Role is required');
    }
    if(role!='patient' || role!='doctor' || role!='admin'){
        throw new Error('Role must be patient, doctor or admin');
    }
    return role;
}

const validateDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) {
        throw new Error('Date of birth is required');
    }
    if(dateOfBirth>new Date()){
        throw new Error('Date of birth must be less than current date');
    }
    return dateOfBirth;
}
const validateGender=(gender)=>{
    if(!gender){
        throw new Error('Gender is required');
    }
    return gender;
}

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateMobileNumber,
    validateRole,
    validateDateOfBirth,
    validateGender
};

let prescriptionss = [];

window.onload = function () {
  fetch(`http://localhost:4000/patients/presecriptions`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network respsonse was not ok");
      }
      return response.json();
      f;
    })
    .then((data) => {
      // Handle the retrieved data (list of appointments) here.
      // You can update the HTML content of your "View Appointments" page with this data.
      const appointmentsList = document.getElementById("appointmentsList");

      console.log(data.prescriptions);
      prescriptionss = data.prescriptions;
      displayPrescriptions();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// Function to display prescriptions
function displayPrescriptions() {
  const prescriptionList = document.getElementById("prescriptionList");

  // Clear the existing list
  prescriptionList.innerHTML = "";

  // Loop through the array and create list items for each prescription
  prescriptionss.forEach((prescription) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
                    <p>Summary : ${prescription.summary}</p>
                    <button onclick="viewPrescriptionDetails('${prescription.location}' , '${prescription.DoctorID}')">Select (View Details)</button>
                `;
    prescriptionList.appendChild(listItem);
  });
}

// Function to view prescription details
function viewPrescriptionDetails(prescriptionLocation, DoctorID) {
  // Replace with your code to display prescription details
  fetch(`http://localhost:4000/doctors/Alldoctors`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network respsonse was not ok");
      }
      return response.json();
      f;
    })
    .then((data) => {
      // Handle the retrieved data (list of appointments) here.
      // You can update the HTML content of your "View Appointments" page with this data.
      const appointmentsList = document.getElementById("appointmentsList");
      let doctor = null;
      console.log(data.data.Doctors);
      for (let i = 0; i < data.data.Doctors.length; i++) {
        if (data.data.Doctors[i].userID == DoctorID) {
          doctor = data.data.Doctors[i];
          break;
        }
      }
      alert(
        `More Info About this prescribtion: \nLocation : ${prescriptionLocation} \nDoctor Name : ${doctor.name} \nDoctor Email : ${doctor.email} \nDoctor Speciality : ${doctor.speciality}`
      );
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the display function to populate the list
displayPrescriptions();

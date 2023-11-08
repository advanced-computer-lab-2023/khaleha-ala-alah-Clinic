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
// Function to display prescriptions
async function displayPrescriptions() {
  const dateFilter = document.getElementById("dateFilter").value;
  const doctorFilter = document
    .getElementById("doctorFilter")
    .value.toLowerCase();
  const filledFilter = document.getElementById("filledFilter").value;

  const prescriptionList = document.getElementById("prescriptionList");

  // Clear the existing list
  prescriptionList.innerHTML = "";

  // Fetch doctor information for all prescriptions in parallel
  const doctorPromises = prescriptionss.map(async (prescription) => {
    try {
      const response = await fetch(`http://localhost:4000/doctors/Alldoctors`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      for (let i = 0; i < data.data.Doctors.length; i++) {
        if (data.data.Doctors[i].userID == prescription.DoctorID) {
          return data.data.Doctors[i];
        }
      }
    } catch (error) {
      console.error("Error fetching doctor information:", error);
    }
    return null; // Return null if doctor information is not found
  });

  // Wait for all doctor information to be fetched
  const doctors = await Promise.all(doctorPromises);

  // Filter prescriptions based on user input and fetched doctor information
  const filteredPrescriptions = prescriptionss.filter((prescription, index) => {
    const doctor = doctors[index];
    const dateMatch = dateFilter === "" || prescription.date === dateFilter;
    const doctorMatch =
      doctorFilter === "" ||
      (doctor && doctor.name.toLowerCase().includes(doctorFilter));
    const filledMatch =
      filledFilter === "all" ||
      (filledFilter === "filled" && prescription.isFilled) ||
      (filledFilter === "unfilled" && !prescription.isFilled);

    return dateMatch && doctorMatch && filledMatch;
  });

  // Loop through the filtered prescriptions and create list items
  filteredPrescriptions.forEach((prescription) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
                    <p>Summary : ${prescription.summary}</p>
                    <button onclick="viewPrescriptionDetails('${prescription.location}' , '${prescription.DoctorID}' , '${prescription.isFilled}')">Select (View Details)</button>
                `;
    prescriptionList.appendChild(listItem);
  });
}

// Function to view prescription details
function viewPrescriptionDetails(prescriptionLocation, DoctorID, isFilled) {
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
        `More Info About this prescribtion: \nLocation : ${prescriptionLocation} \nPrescription filled status : ${
          isFilled ? "Filled" : "Unfilled"
        } \nDoctor Name : ${doctor.name} \nDoctor Email : ${
          doctor.email
        } \nDoctor Speciality : ${doctor.speciality}`
      );
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the display function to populate the list
// Add an event listener for the filter button
document
  .getElementById("filterButton")
  .addEventListener("click", displayPrescriptions);

// Initial display of all prescriptions
displayPrescriptions();

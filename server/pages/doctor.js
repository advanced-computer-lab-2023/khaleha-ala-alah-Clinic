const backendUrl = "http://localhost:4000";
let appointments = [];
let myPatients = [];

window.onload = function () {
  fetch(`http://localhost:4000/doctors/appointments`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the retrieved data (list of appointments) here.
      // You can update the HTML content of your "View Appointments" page with this data.
      console.log(data);

      fetch("http://localhost:4000/doctors")
        .then((response2) => {
          if (!response2.ok) {
            throw new Error("Network response was not ok");
          }
          return response2.json();
        })
        .then((data2) => {
          // Handle the retrieved data (list of appointments) here.
          // You can update the HTML content of your "View Appointments" page with this data.
          console.log(data2);
          const appointmentsList = document.getElementById("appointmentsList");

          console.log(data.appointments.length);
          appointments = data;
          myPatients = data2.patients;
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
      console.log("ALOOO"); // You should replace this with your own logic.
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

function searchPatientByName() {
  const nameSearchValue = document
    .getElementById("nameSearch")
    .value.toLowerCase();

  // Apply the name filter and update the display
  const doctors = myPatients.filter((doctor) => {
    return doctor.name.toLowerCase().includes(nameSearchValue);
  });

  const doctorList = document.getElementById("doctorList");
  //window.location.href = "searchresults.html";
  // Clear the existing list
  doctorList.innerHTML = "";

  // Loop through the array and create list items for each doctor name
  doctors.forEach((doctor) => {
    const listItem = document.createElement("li");
    listItem.textContent = "name : " + doctor.name;
    doctorList.appendChild(listItem);
  });
}

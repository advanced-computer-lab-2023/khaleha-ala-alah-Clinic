let allDoctors = [];
window.onload = function () {
  fetch(`http://localhost:4000/doctors/Alldoctors`)
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
      allDoctors = data.data.Doctors;
      console.log(allDoctors);
      console.log("ALOOO"); // You should replace this with your own logic.
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

function searchDoctorByName() {
  const nameSearchValue = document
    .getElementById("nameSearch")
    .value.toLowerCase();

  // Apply the name filter and update the display
  const doctors = allDoctors.filter((doctor) => {
    return doctor.name.toLowerCase().includes(nameSearchValue);
  });

  const doctorList = document.getElementById("doctorList");
  //window.location.href = "searchresults.html";
  // Clear the existing list
  doctorList.innerHTML = "";

  // Loop through the array and create list items for each doctor name
  doctors.forEach((doctor) => {
    const listItem = document.createElement("li");
    listItem.textContent = doctor.name;
    doctorList.appendChild(listItem);
  });
}

function searchDoctorBySpeciality() {
  const nameSearchValue = document
    .getElementById("nameSearch")
    .value.toLowerCase();

  // Apply the name filter and update the display
  const doctors = allDoctors.filter((doctor) => {
    return doctor.speciality.toLowerCase().includes(nameSearchValue);
  });

  const doctorList = document.getElementById("doctorList");
  //window.location.href = "searchresults.html";
  // Clear the existing list
  doctorList.innerHTML = "";

  // Loop through the array and create list items for each doctor name
  doctors.forEach((doctor) => {
    const listItem = document.createElement("li");
    listItem.textContent = "name : " + doctor.name;
    const listItem2 = document.createElement("li");
    listItem2.textContent = "speciality : " + doctor.speciality;
    doctorList.appendChild(listItem);
    doctorList.appendChild(listItem2);
  });
}

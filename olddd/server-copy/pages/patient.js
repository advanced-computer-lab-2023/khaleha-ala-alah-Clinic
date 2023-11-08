let allDoctors = [];
let searchResults = [];
let doctorList = document.getElementById("doctorList");
let specialityFilter = document.getElementById("specialityFilter");
let dayFilter = document.getElementById("dayFilter");
let timeFilter = document.getElementById("timeFilter");
let filterButton = document.getElementById("filterButton");
window.onload = function () {
  doctorList = document.getElementById("doctorList");
  specialityFilter = document.getElementById("specialityFilter");
  dayFilter = document.getElementById("dayFilter");
  timeFilter = document.getElementById("timeFilter");
  filterButton = document.getElementById("filterButton");
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
  searchResults = doctors;

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

document.addEventListener("DOMContentLoaded", function () {
  // Your script code goes here
  // This will execute when the page is fully loaded
  const filterButton = document.getElementById("filterButton");
  document.getElementById("filterButton").addEventListener("click", () => {
    // Filter doctors based on user input
    const filteredDoctors = filterDoctors(searchResults);
    // Display the filtered list of doctors
    displayDoctors(filteredDoctors);
  });
});

function filterDoctors(doctors) {
  const speciality = specialityFilter.value;
  const day = dayFilter.value;
  const time = timeFilter.value;

  // Use the filter() method to filter doctors based on the criteria
  return doctors.filter((doctor) => {
    const specialityMatch =
      speciality === "all" || doctor.speciality === speciality;
    const dayMatch = day === "all" || doctorHasAvailability(doctor, day, time);
    return specialityMatch && dayMatch;
  });
}

function displayDoctors(doctors) {
  doctorList.innerHTML = "";
  doctors.forEach((doctor) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Doctor: ${doctor.name}, Speciality: ${doctor.speciality}`;
    doctorList.appendChild(listItem);
  });
}

function doctorHasAvailability(doctor, day, time) {
  // Implement the logic to check if the doctor has availability
  // You'll need to compare the day and time with the doctor's fixedSlots
  // Return true if available, false otherwise
  // Example logic:
  return doctor.fixedSlots.some(
    (slot) => slot.day === day && slot.hour === time
  );
}

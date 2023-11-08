const backendUrl = "http://localhost:4000";
let appointments = [];
let doctors = [];

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
          for (let i = 0; i < data.appointments.length; i++) {
            const appointmentItem = document.createElement("li");
            const date = new Date(data.appointments[i].timedAt);
            const doctorInfo = data2.patients[i];

            appointmentItem.innerHTML = `
            <p>Date: ${date.toDateString()}</p>
            <p>Patient: ${doctorInfo.name}</p>
            <p>Email: ${doctorInfo.email}</p>
            `;

            console.log(appointmentItem);

            appointmentsList.appendChild(appointmentItem);
          }
          appointments = data;
          doctors = data2;
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

// Function to filter appointments based on date and status
function filterAppointments() {
  const dateFilterValue = document.getElementById("dateFilter").value;
  const statusFilterValue = document.getElementById("statusFilter").value;

  // Apply filters and update the display
  console.log(appointments);
  const filteredAppointments = appointments.appointments.filter(
    (appointment) => {
      console.log(appointment);
      const appointmentDate = new Date(appointment.timedAt).toDateString();
      const formattedAppointmentDate = new Date(appointment.timedAt)
        .toISOString()
        .split("T")[0]; // Convert to 'YYYY-MM-DD'

      // Check if the appointment date matches the date filter
      console.log(appointmentDate, dateFilterValue);

      const dateFilterPassed =
        dateFilterValue === "" || formattedAppointmentDate == dateFilterValue;

      let status = "confirmed";
      if (appointment.timedAt > Date.now()) {
        status = "pending";
      }

      console.log(statusFilterValue);
      // Check if the appointment status matches the status filter
      const statusFilterPassed =
        statusFilterValue === "all" || status === statusFilterValue;

      console.log(dateFilterPassed);

      return dateFilterPassed && statusFilterPassed;
    }
  );

  displayAppointments(filteredAppointments);
}

// Function to display appointments on the page
function displayAppointments(appointments) {
  const appointmentsList = document.getElementById("appointmentsList");
  appointmentsList.innerHTML = ""; // Clear the existing list
  console.log("ALO");
  console.log(doctors);
  for (let i = 0; i < appointments.length; i++) {
    const appointmentItem = document.createElement("li");
    const date = new Date(appointments[i].timedAt);
    const doctorInfo = doctors.patients[i];

    appointmentItem.innerHTML = `
      <p>Date: ${date.toDateString()}</p>
      <p>Patient: ${doctorInfo.name}</p>
      <p>Email: ${doctorInfo.email}</p>
    `;

    appointmentsList.appendChild(appointmentItem);
  }
}

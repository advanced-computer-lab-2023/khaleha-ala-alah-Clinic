window.onload = function () {
  fetch(`http://localhost:4000/patients/currentPatient`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the retrieved data (list of appointments) here.
      // You can update the HTML content of your "View Appointments" page with this data.
      const appointmentsList = document.getElementById("appointmentsList");

      console.log(data.data.user.familyMembers);
      for (let i = 0; i < data.data.user.familyMembers.length; i++) {
        const appointmentItem = document.createElement("li");
        const familyMember = data.data.user.familyMembers[i];
        appointmentItem.innerHTML = `
            <p>Name: ${familyMember.name} </p>
            <p>National id: ${familyMember.nationalID}</p>
            <p>age: ${familyMember.age}</p>
            <p>gender: ${familyMember.gender}</p>
            <p>relation: ${familyMember.relationToPatient}</p>
            `;

        console.log(appointmentItem);

        appointmentsList.appendChild(appointmentItem);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

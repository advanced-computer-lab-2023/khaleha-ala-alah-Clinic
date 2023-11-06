import React, { useState, useEffect } from "react";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all pending doctors
    const fetchPendingDoctors = async () => {
      try {
        const response = await fetch("http://localhost:4000/admins/getPending", {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDoctors(data.data.pendingDoctors);
      } catch (err) {
        setError(err.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchPendingDoctors();
  }, []);

  return (
    <div>
      <h2>Pending Doctors</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.name}>
            <p>Name: {doctor.name}</p>
            <p>Birthdate: {doctor.birthdate}</p>
            <p>Affiliation: {doctor.affiliation}</p>
            <p>Speciality: {doctor.speciality}</p>
            <p>Educational Background: {doctor.educationalBackground}</p>
            {doctor.files.length > 0 && (
              <div>
                <p>Attached Files:</p>
                <table>
                  <tbody>
                    {doctor.files.map((file, index) => (
                      <tr key={index}>
                        <td>{file}</td>
                        <td>
                          <a href={`http://localhost:4000/api/files/${file}/download`} download>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingDoctors;

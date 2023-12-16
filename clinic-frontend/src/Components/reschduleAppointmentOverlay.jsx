import { useState } from "react";
import styles from "./FollowUpScheduler.module.css";
import LoadingPage from "./LoadingPageForOverlay.jsx";

const RescheduleAppointmentOverlay = ({
  onCancel,
  currentAppointments,
  selectedApp,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [date, setDate] = useState(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://localhost:4000";

  const rescheduleAppointment = async () => {
    if (selectedApp !== null) {
      console.log(selectedApp);
      console.log(selectedAppointment);
      fetch(
        `${backendUrl}/patients/rescheduleAppointment/${selectedApp._id}/${selectedAppointment}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Specify the content type if needed
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            console.log("Appointment Rescheduled");
            //fetchAppointments();
          } else {
            console.log("Failed to Reschedule Appointment");
          }
        })
        .catch((error) => {
          console.error("Error Rescheduling Appointment:", error);
        });
    }
  };

  return (
    <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
      <div className={styles.confirmationDialog}>
        <h1 className={styles.headerofFollowUp}>Follow-Up Scheduler</h1>
        <form
          className={styles.formOfFollowUp}
          onSubmit={(e) => {
            //console.log(patient);
            e.preventDefault();
            //console.log(selectedDateTime);
          }}
        >
          {loading ? (
            <LoadingPage />
          ) : (
            currentAppointments.map((appointment, index) => {
              const date = new Date(appointment);
              const appointmentLabel = `${date.toDateString()} - ${
                date.toTimeString().split(" ")[0]
              }`;
              return (
                <div key={index} className={styles.radioOfFollowUp}>
                  <input
                    type="radio"
                    id={`appointment_${index}`}
                    name="appointment"
                    value={appointment}
                    //checked={selectedAppointment === appointment}
                    onChange={() => {
                      setSelectedAppointment(appointment);
                      setDate(appointment.timedAt);
                      console.log("alo");
                    }}
                  />
                  <label htmlFor={`appointment_${index}`}>
                    {appointmentLabel}
                  </label>
                </div>
              );
            })
          )}
          <div className={styles.pagination}></div>

          <button
            className={styles.buttonOfFollowUp}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              console.log(selectedAppointment);
              setDate(selectedAppointment);
              onCancel();
              rescheduleAppointment();
              //scheduleFollowUp();
            }}
          >
            Schedule Follow-Up
          </button>
        </form>
        <p className={styles.paragraphofFollowUp}>{}</p>
      </div>
    </div>
  );
};
export default RescheduleAppointmentOverlay;

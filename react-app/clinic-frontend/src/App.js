import logo from "./logo.svg";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import FamilyMembers from "./Components/viewFamilyMembers";
import RegisterFamilymember from "./Components/RegistrationForm";
import { Login } from "./Components/login";
import { PatientHome } from "./Components/patientHome";
import { DoctorHome } from "./Components/doctorHome";
import { AdminHome } from "./Components/adminHome";
import { VerifyUser } from "./Components/verifyUser";
import { PatientRegister } from "./Components/patientRegister";
import Appointments from "./Components/appointments";
import Prescriptions from "./Components/prescriptions";
import DoctorSearch from "./Components/searchDoctors";
import DoctorList from "./Components/viewAllDoctors";
import { DoctorRegister } from "./Components/doctorRegister";
import DoctorProfileUpdate from "./Components/editDoctorProfile";
import DoctorAppointments from "./Components/Appointmentsdoctor";
import PrescriptionsDoctors from "./Components/patientdoctorhealth";
import DoctorPatients from "./Components/viewallmypatients";
import AddAdmin from "./Components/addAdmin";
import DeleteUser from "./Components/deleteAdminDoctorPatiient";
import PendingDoctors from "./Components/viewPendingDoctors";
import HealthPackages from "./Components/packages";
//import PackageCard from "./Components/packageCard.jsx";
import PackagesPage from "./Components/packagesPage";

function App() {
  return (
    <div className="App">
      <PackagesPage />
    </div>
  );
}

export default App;

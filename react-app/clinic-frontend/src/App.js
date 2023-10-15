import logo from "./logo.svg";
import {Route, Routes,Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import FamilyMembers from "./Components/viewFamilyMembers";
import RegisterFamilymember from "./Components/RegistrationForm";
import {Login} from "./Components/login";
import {PatientHome} from "./Components/patientHome";
import {DoctorHome} from "./Components/doctorHome";
import {AdminHome} from "./Components/adminHome";
import {VerifyUser} from "./Components/verifyUser";
import {PatientRegister} from "./Components/patientRegister";
import Appointments from "./Components/appointments";
import Prescriptions from "./Components/prescriptions";
import DoctorSearch from "./Components/searchDoctors";
import DoctorList from "./Components/viewAllDoctors";
import {DoctorRegister} from "./Components/doctorRegister";
import DoctorProfileUpdate from "./Components/editDoctorProfile";
import DoctorAppointments from "./Components/Appointmentsdoctor";
import PrescriptionsDoctors from "./Components/patientdoctorhealth";
import DoctorPatients from "./Components/viewallmypatients";

function App() {
  return (
    <div className="App">
          <Routes>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/PatientRegister" element={<PatientRegister />} />
            <Route path="/DoctorRegister" element={<DoctorRegister />} />
            
            {/* private routes */}
            <Route element={<PrivateRoute/>} >
              {/* patient routes */}
              <Route path="/patientHome" element={<PatientHome />} />
              <Route path="/familyMembers" element={<FamilyMembers />} />
              <Route path="/registerFamilyMember" element={<RegisterFamilymember />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/searchDoctors" element={<DoctorSearch />} />
              <Route path="/viewAllDoctors" element={<DoctorList />} />
              <Route path="/editDoctorProfile" element={<DoctorProfileUpdate />} />
              <Route path="/doctorAppointments" element={<DoctorAppointments />} />
              <Route path="/patientdoctorhealth" element={<PrescriptionsDoctors />} />
              <Route path="/viewallmypatients" element={<DoctorPatients />} />

              {/* doctor routes */}
              <Route path="/doctorhome" element={<DoctorHome />} />


              {/* admin routes */}
              <Route path="/adminHome" element={<AdminHome />} />


              {/* common routes */}
              <Route path="/verifyUser" element={<VerifyUser />} />
             </Route>
              
            {/* not found page */}
            <Route path="*" element={<h1>Not Found</h1>} />
            
          </Routes>
    </div>
  );
}

export default App;

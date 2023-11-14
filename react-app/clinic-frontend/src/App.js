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
import ResetPassword from "./Components/resetpassword";
import ForgotPassword from "./Components/forgotPassword";
import NotFound from "./Components/notFound";
import Bookpage from "./Components/Book";
import NotApproved from "./Components/notApproved";
import PackagesManagment from "./Components/packageManagmentPage";
import MyselfPackages from "./Components/myselfPackages";
import FollowUpScheduler from './Components/FollowUpScheduler.jsx';
import AvailableSlotsForm from "./Components/AvailableSlotsForm.jsx";
import FamilyMemberPackages from "./Components/familyMembersPackages";
import FamilyMemberDetails from "./Components/familyMemberDetails";
import SubscribeToFamilyMemberPackage from "./Components/subscribeToFamilyMemberPackage";
import { useAuth } from "./AuthContext";
import ContractPage from "./Components/Contract";
import StripePaymentButton from "./Components/Checkout";
import StripePaymentButtonFF from "./Components/CheckoutFamilyMemberPaackage";
import AddFamilyMemberPage from "./Components/addFamilyMember.jsx";
import AddFamilyEmail from "./Components/addFamilyMemberEmail.jsx";
import AddFamilyMemberPhone from "./Components/addFamilyMemberPhone.jsx";

import AppointmentCheckout from "./Components/appointmentCheckout"
import "./App.css";
import Wallet from './Components/Wallet.js'
import PaymentMethod from "./Components/choose-to-pay.js";



import HealthRecordForm from "./Components/HealthRecordForm";


import "./App.css";
import ChangePasswordForm from "./Components/changePassword.jsx";


function App() {
  const { role } = useAuth();
  return (
    <div className="App">
      <Routes>
        {/* public routes */}

        <Route path="/login" element={<Login />} />
     <Route path="/paymentMethod" element={<PaymentMethod />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/PatientRegister" element={<PatientRegister />} />
        <Route path="/DoctorRegister" element={<DoctorRegister />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
           <Route path="/wallet" element={<Wallet />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Redirect to login if no role is defined (user is not authenticated) */}
        {role === "" && <Route path="*" element={<Navigate to="/login" />} />}

        {/* private routes */}
        <Route element={<PrivateRoute />}>
          {/* patient routes */}
          {role === "patient" && (
            <>
            
              <Route path="/patientHome" element={<PatientHome />} />
              <Route path="/familyMembers" element={<FamilyMembers />} />
              <Route
                path="/registerFamilyMember"
                element={<RegisterFamilymember />}
              />
                  
                   <Route path="/appointment-book" element={<AppointmentCheckout />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/searchDoctors" element={<DoctorSearch />} />
              <Route path="/viewAllDoctors" element={<DoctorList />} />
              <Route path="/packagesPage" element={<PackagesPage />} />
              <Route path="/managePackages" element={<PackagesManagment />} />
              <Route path="/myselfPackages" element={<MyselfPackages />} />
              <Route
                path="/familyMemberPackages"
                element={<FamilyMemberPackages />}
              />
              <Route
                path="/familyMemberDetails"
                element={<FamilyMemberDetails />}
              />
              <Route path="/checkout" element={<PaymentMethod />} />

              <Route
                path="/subscribeToFamilyMemberPackage"
                element={<SubscribeToFamilyMemberPackage />}
              />


              <Route path="/CheckoutFamilyMemberPaackage" element={<StripePaymentButtonFF />} />  
              <Route path="/appointmentCheckout" element={< PaymentMethod />} />  

              {/* <Route
                path="/appointmentCheckout"
                element={<AppointmentCheckout />}
              /> */}

              <Route
                path="/addFamilyMemberUsingEmail"
                element={<AddFamilyEmail />}
              />
              <Route
                path="/addFamilyMemberUsingPhone"
                element={<AddFamilyMemberPhone />}
              />
              <Route
                path="/addFamilyMember"
                element={<AddFamilyMemberPage />}
              />
              <Route path="/changePassword" element={<ChangePasswordForm />} />
            </>
          )}

          {/* doctor routes */}
          {role === "doctor" && (
            <>
              <Route path="/doctorhome" element={<DoctorHome />} />
              <Route
                path="/editDoctorProfile"
                element={<DoctorProfileUpdate />}
              />
              <Route
                path="/doctorAppointments"
                element={<DoctorAppointments />}
              />
              <Route
                path="/patientdoctorhealth"
                element={<PrescriptionsDoctors />}
              />
              <Route
                path="/HealthRecordForm"
                element={<HealthRecordForm />}
              />
              <Route path="/viewallmypatients" element={<DoctorPatients />} />
              <Route path="/changePassword" element={<ChangePasswordForm />} />
              <Route
                path="/follow-up-scheduler"
                element={<FollowUpScheduler />}
              />
              <Route path="/available-slots" element={<AvailableSlotsForm />} />
            </>
          )}

          {/* admin routes */}
          {role === "admin" && (
            <>
              <Route path="/adminHome" element={<AdminHome />} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route
                path="/deleteAdminDoctorPatient"
                element={<DeleteUser />}
              />
              <Route path="/viewPendingDoctors" element={<PendingDoctors />} />
              <Route path="/packages" element={<HealthPackages />} />
              <Route path="/changePassword" element={<ChangePasswordForm />} />
            </>
          )}

          {/* common routes */}
          {role === "notVerified" && (
            <Route path="/verifyUser" element={<VerifyUser />} />
          )}
          {role === "notApproved" && (
            <Route path="/notApproved" element={<NotApproved />} />
          )}
        </Route>

        <Route path="/bookAppointment" element={<Bookpage />} />
        {/* Redirect to login if no role is defined (user is not authenticated) */}
        {role === "" && <Route path="*" element={<Navigate to="/login" />} />}

        {/* private routes */}
        <Route element={<PrivateRoute />} />
        {/* patient routes */}
        {role === "patient" && (
          <>
            <Route
              path="/packages"
              element={<StripePaymentButton amount={100} />}
            />

            <Route path="/patientHome" element={<PatientHome />} />
            <Route path="/familyMembers" element={<FamilyMembers />} />
            <Route
              path="/registerFamilyMember"
              element={<RegisterFamilymember />}
            />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/searchDoctors" element={<DoctorSearch />} />
            <Route path="/viewAllDoctors" element={<DoctorList />} />
          </>
        )}

        {/* doctor routes */}
        {role === "doctor" && (
          <>
            <Route path="/doctorhome" element={<DoctorHome />} />
            <Route
              path="/editDoctorProfile"
              element={<DoctorProfileUpdate />}
            />
            <Route
              path="/doctorAppointments"
              element={<DoctorAppointments />}
            />
            <Route
              path="/patientdoctorhealth"
              element={<PrescriptionsDoctors />}
            />
            <Route path="/viewallmypatients" element={<DoctorPatients />} />
            <Route
              path="/follow-up-scheduler"
              element={<FollowUpScheduler />}
            />
            <Route path="/available-slots" element={<AvailableSlotsForm />} />
          </>
        )}

        {/* private routes */}
        <Route element={<PrivateRoute />}>
          {/* patient routes */}
          {role === "patient" && (
            <>
              <Route path="/patientHome" element={<PatientHome />} />
              <Route path="/familyMembers" element={<FamilyMembers />} />
              <Route
                path="/registerFamilyMember"
                element={<RegisterFamilymember />}
              />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/searchDoctors" element={<DoctorSearch />} />
              <Route path="/viewAllDoctors" element={<DoctorList />} />
            </>
          )}

          {/* doctor routes */}
          {role === "doctor" && (
            <>
              <Route path="/doctorhome" element={<DoctorHome />} />
              <Route
                path="/editDoctorProfile"
                element={<DoctorProfileUpdate />}
              />
              <Route
                path="/doctorAppointments"
                element={<DoctorAppointments />}
              />
              <Route
                path="/patientdoctorhealth"
                element={<PrescriptionsDoctors />}
              />
              <Route path="/viewallmypatients" element={<DoctorPatients />} />
              <Route
                path="/follow-up-scheduler"
                element={<FollowUpScheduler />}
              />
              <Route path="/available-slots" element={<AvailableSlotsForm />} />
            </>
          )}

          {/* admin routes */}
          {role === "admin" && (
            <>
              <Route path="/adminHome" element={<AdminHome />} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route
                path="/deleteAdminDoctorPatient"
                element={<DeleteUser />}
              />
              <Route path="/viewPendingDoctors" element={<PendingDoctors />} />
              <Route path="/packages" element={<HealthPackages />} />
            </>
          )}
          {/* admin routes */}
          {role === "admin" && (
            <>
              <Route path="/adminHome" element={<AdminHome />} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route
                path="/deleteAdminDoctorPatient"
                element={<DeleteUser />}
              />
              <Route path="/viewPendingDoctors" element={<PendingDoctors />} />
              <Route path="/packages" element={<HealthPackages />} />
            </>
          )}

          {/* common routes */}
          {role === "notVerified" && (
            <Route path="/verifyUser" element={<VerifyUser />} />
          )}
          {role === "notApproved" && (
            <Route path="/notApproved" element={<NotApproved />} />
          )}
        </Route>

        {/* not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Landingpage from './Component/Landingpage/Landingpage';
// import AdminLoginPage from './Component/Admin';
import Admin from './Component/Admin';
import RegistrationForm from './Component/RegistrationForm';
import AdminDashboard from './Component/AdminDashboard/AdminDashboard';
import Loginpage from './Component/Loginpage/Loginpage';
import DoctorsForm from './Component/DoctorsForm';
import DoctorsLogin from './Component/DoctorsLogin';
import Patients from './Component/Loginpage/Patients';
import Navbar from './Component/Loginpage/Navbar';
import Bookappointment from './Component/Loginpage/Bookappointment';
import Doctor from './Component/Doctor';
import DoctorProfile from './Component/DoctorProfile';
import Appointments from './Component/Appointments';
import AboutUs from './Component/AboutUs';
import AdminDoctorView from './Component/AdminPages/AdminDoctorView';
import AdminUserView from './Component/AdminPages/AdminUserView';
import AdminAppointmentViews from './Component/AdminPages/AdminAppointmentViews';
import MyAppointment from './Component/MyAppointment';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/DoctorsForm' element={<DoctorsForm />} />
          <Route path='/RegistrationForm' element={<RegistrationForm />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/Loginpage' element={<Loginpage />} />
          <Route path='/DoctorsLogin' element={<DoctorsLogin />} />
          <Route path='/Patients' element={<Patients />} />
          <Route path='/Navbar' element={<Navbar />} />
          <Route path='/Bookappointment' element={<Bookappointment />} />
          <Route path='/Doctor' element={<Doctor />} />
          <Route path='/appointment' element={<Appointments />} />
          <Route path='/DoctorProfile' element={<DoctorProfile />} />
          <Route path='/Aboutus' element={<AboutUs />} />
          <Route path='/AdminDoctorView' element={<AdminDoctorView />} />
          <Route path='/AdminUserView' element={<AdminUserView />} />
          <Route path='/AdminappointmentView' element={<AdminAppointmentViews />} />

          <Route path='/MyAppointment' element={<MyAppointment />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

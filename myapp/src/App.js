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





        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import img1 from "../../assests/img01.jpg";

function Landingpage() {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="landing">
      <nav className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <p className="text-3xl font-bold text-white">BookMyCare</p>
          <button className="block md:hidden focus:outline-none">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <p className="text-white hover:text-gray-900 cursor-pointer">Home</p>
            <p className="text-white hover:text-gray-900 cursor-pointer">Contact Us</p>
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="text-white hover:text-gray-900 flex items-center mt-2"
              >
                Login
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.878l3.71-3.69a.75.75 0 111.06 1.06l-4 3.998a.75.75 0 01-1.06 0l-4-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <ul className="absolute bg-white border rounded shadow-lg mt-1">
                  <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="/Admin">Admin</a></li>
                  <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="/Loginpage">Patient</a></li>
                  <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="/DoctorsLogin">Doctor</a></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full">
        <img src={img1} className="w-full h-auto" alt="Hospital" />
      </div>

      {/* New content section */}
      <section className="py-12 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to BookMyCare</h2>
          <p className="text-lg text-gray-600 mb-8">
            BookMyCare is your one-stop solution for managing healthcare appointments efficiently and conveniently. Our platform offers a seamless experience for patients, doctors, and administrators.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xs">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">For Patients</h3>
              <p className="text-gray-600">Register and book appointments with your preferred doctors. Keep track of your medical history and upcoming visits all in one place.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xs">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">For Doctors</h3>
              <p className="text-gray-600">Manage your appointments, view patient records, and streamline your workflow with ease using our intuitive interface.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xs">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">For Admins</h3>
              <p className="text-gray-600">Oversee the entire system, manage users, and ensure smooth operations across the platform.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 BookMyCare. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </footer>
    </div>
  );
}

export default Landingpage;

import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 rounded-lg shadow-2xl border-4 ">
            <h1 className="text-5xl font-extrabold text-white mb-6 text-center">About Us</h1>
            <p className="text-white text-lg mb-8">
                Welcome to <strong className="text-yellow-300">BookMyCare</strong>, your one-stop solution for booking medical appointments online. Our platform is designed to streamline the process of connecting patients with healthcare providers, making it easier than ever to access the medical care you need.
            </p>
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Our Vision</h2>
            <p className="text-white text-lg mb-8">
                At BookMyCare, we envision a world where healthcare is easily accessible to everyone. We understand that scheduling appointments can often be a hassle, filled with long waiting times and complicated procedures. Our goal is to simplify this process through technology, enabling patients to book appointments at their convenience.
            </p>
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Our Mission</h2>
            <p className="text-white text-lg mb-8">
                Our mission is to provide a user-friendly platform that allows patients to search for doctors by specialty, location, and availability. With just a few clicks, you can schedule an appointment that fits your schedule, ensuring that you receive timely care when you need it most.
            </p>
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Our Commitment</h2>
            <p className="text-white text-lg mb-8">
                We are committed to enhancing the healthcare experience by prioritizing patient satisfaction and safety. Our platform is designed with user privacy in mind, ensuring that all personal information is securely handled. We strive to build a community where patients feel empowered and informed about their healthcare choices.
            </p>
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Join Us</h2>
            <p className="text-white text-lg">
                Join us at <strong className="text-yellow-300">BookMyCare</strong> as we transform the way healthcare appointments are made. Experience the ease of online booking and take control of your health today!
            </p>
        </div>
    );
};

export default AboutUs;

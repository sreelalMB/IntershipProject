const mongoose = require("mongoose");
const DoctorSchema = require("./DoctorSchema");
const UserSchema = require("./Userschema");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const appSchema = require('../Schema/AppointmentSchema')

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set filename to timestamp
  }
});
const upload = multer({ storage: storage });

// Add new user (register)
const addusers = (req, res) => {
  const { name, email, password, phone } = req.body;
  const newUser = new UserSchema({ name, email, password, phone });

  newUser.save()
    .then(() => {
      res.status(200).json({ msg: "success", status: 200 });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: err.message, status: 500 });
    });
};

// User login (validate email and password)
const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.findOne({ email, password });
    if (user) {
      res.status(200).json({ msg: "exist", userId: user._id });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Doctor registration
const docReg = async (req, res) => {
  const { name, email, specialization, password, phone } = req.body;

  try {
    const newDoc = new DoctorSchema({ name, email, specialization, password, phone });
    await newDoc.save();
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during registration");
  }
};

// Doctor login (validate email and password)
const doclogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await DoctorSchema.findOne({ email, password });
    if (doctor) {
      res.status(200).json({ msg: "exist", userId: doctor._id });
    } else {
      res.status(404).send("Doctor not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get list of doctors
const doclist = async (req, res) => {
  try {
    const doctors = await DoctorSchema.find();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching doctors" });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  const { name, email, specialization } = req.body;
  const doctorId = req.params.id;

  try {
    const uploadsPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }

    let profileImage;
    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    const updateFields = { name, email, specialization };
    if (profileImage) {
      updateFields.img = profileImage;
    }

    const updatedDoctor = await DoctorSchema.findByIdAndUpdate(doctorId, updateFields, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (err) {
    console.error("Error during profile update:", err);
    res.status(500).json({ message: "Server error during profile update" });
  }
};

// Find specific doctor by userId
const findDoc = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userDetails = await DoctorSchema.findById(userId);

    if (userDetails) {
      return res.status(200).json({
        status: "success",
        user: {
          id: userDetails._id,
          name: userDetails.name,
          email: userDetails.email,
          specialization: userDetails.specialization,
          img: userDetails.img,
        },
      });
    } else {
      return res.status(404).json({ status: "error", message: "Doctor not found" });
    }
  } catch (error) {
    console.error("Error finding doctor:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};



const bookapp = async (req, res) => {
  const { selectedDoctor, appointmentDate, appointmentTime } = req.body;
  const userId=req.params.userId;

  try {
    // Validate the input
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new appointment document
    const appointment = new appSchema({
      patient:userId,
      doctor: selectedDoctor,
      date: new Date(appointmentDate), // Ensure the date format is correct
      time: appointmentTime,
    });

    // Save the appointment to the database
    const savedAppointment = await appointment.save();

    if (savedAppointment) {
      res.status(201).json({ 
        message: "Appointment booked successfully", 
        appointment: savedAppointment,
        Doctor: savedAppointment.doctor 
      });
    } else {
      res.status(400).json({ message: "Failed to book appointment" });
    }
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ 
      message: "Server error during appointment booking", 
      error: err.message 
    });
  }
};

const getAppointments = async (req, res) => {
  const doctorId = req.params.doctorId; // Extract doctorId from request parameters

  try {
    console.log('Doctor ID received:', doctorId);

    if (!doctorId) {
      console.error('Doctor ID is missing');
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const appointments = await appSchema.find({ doctor: doctorId })
      .populate('doctor', 'name specialization') // Populate the doctor's name and specialization
      .populate('patient','name email'); // Populate the patient's name and email

    if (appointments.length > 0) {
      console.log('Appointments found:', appointments);
      res.status(200).json({ message: "Appointments retrieved successfully", appointments });
    } else {
      console.log('No appointments found for doctor ID:', doctorId);
      res.status(404).json({ message: "No appointments found" });
    }
  } catch (err) {
    console.error('Error in fetching appointments:', err);
    res.status(500).json({ message: "Server error during fetching appointments", error: err.message });
  }
};






module.exports = {
  addusers,
  userlogin,
  docReg,
  doclogin,
  doclist,
  updateDoctorProfile,
  findDoc, bookapp ,getAppointments
};

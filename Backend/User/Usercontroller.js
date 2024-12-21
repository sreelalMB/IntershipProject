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
  const { userId, doctorId, date, time, status } = req.body;
  try {
    const appointment = new appSchema({
      patient: userId,
      doctor: doctorId,
      date,
      time,
      status: status || "pending",
    });
    // console.log(appointment)

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Failed to book appointment." });
  }
};

const getAppointments = async (req, res) => {
  const { doctorId } = req.params
  const { status } = req.query;// Extract doctorId from request parameter

  const query = { doctor: doctorId };
  if (status) query.status = status;

  const findDoc = await appSchema.find(query).populate('patient', 'name email phone')
  // console.log(findDoc)
  if (findDoc) {
    res.status(201).json(findDoc)
    // console.log(findDoc)
  } else {
    res.status(404).json({ msg: "Finding doctor failed" })
  }
};

const userAppointmentView = async (req, res) => {
  const { id } = req.params
  const { status } = req.query;

  const query = { patient: id };
  if (status) query.status = status;

  console.log("query:", query)

  const findUser = await appSchema.find(query).populate('doctor', 'name specialization')
  // console.log("Finding User :" ,findUser)
  if (findUser) {
    res.status(201).json(findUser)
    // console.log("Finding User :" ,findUser)
  } else {
    res.status(404).json({ msg: "Finding User failed" })
  }
};


const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(id)
  console.log(status)

  try {
    const updatedAppointment = await appSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    // console.log(updatedAppointment)
    if (updatedAppointment) {
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ msg: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const rejectAppointment = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  console.log(id)
  console.log(status)

  try {
    const updatedAppointment = await appSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    // console.log(updatedAppointment)
    if (updatedAppointment) {
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ msg: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ msg: "Internal server error" });
  }

}




const appointmentView = async (req, res) => {
  const viewAppointment = await appSchema.find().populate('patient', 'name email').populate('doctor', 'name specialization')
  // console.log(viewAppointment)
  if (viewAppointment) {
    res.status(201).json(viewAppointment)
  }
}

const viewUser = (async (req, res) => {
  const viewUser = await UserSchema.find();
  if (viewUser) {
    res.status(200).json(viewUser)
  }
})

const deleteUser = (async (req, res) => {
  const { id } = req.params
  const deleteUser = await UserSchema.findByIdAndDelete(id);
  if (deleteUser) {
    res.status(200)
    await appSchema.findOneAndDelete({ patient: id })
  }
})

const docView = async (req, res) => {
  const docView = await DoctorSchema.find()
  if (docView) {
    res.status(200).json(docView)
  }
}


const patientCount = (async (req, res) => {
  const patient = await UserSchema.countDocuments()
  if (patient) {
    res.json(patient)
  }
})
const doctorCount = (async (req, res) => {
  const doctor = await DoctorSchema.countDocuments()
  if (doctor) {
    res.json(doctor)
  }
})
const appointmentCount = (async (req, res) => {
  const appointment = await appSchema.countDocuments()
  if (appointment) {
    res.json(appointment)
  }
})
const pendingAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { status = "pending" } = req.query;

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    // Check if the doctor exists and count appointments in one step
    const doctorExists = await DoctorSchema.exists({ _id: doctorId });
    if (!doctorExists) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Count the number of appointments
    const appointmentCount = await appSchema.countDocuments({ doctor: doctorId, status });

    // Respond with the count
    return res.status(200).json({ count: appointmentCount });
  } catch (error) {
    console.error("Error fetching pending appointments: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const approvedappointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { status = "approved" } = req.query;

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    // Check if the doctor exists and count appointments in one step
    const doctorExists = await DoctorSchema.exists({ _id: doctorId });
    if (!doctorExists) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Count the number of appointments
    const appointmentCount = await appSchema.countDocuments({ doctor: doctorId, status });

    // Respond with the count
    return res.status(200).json({ count: appointmentCount });
  } catch (error) {
    console.error("Error fetching pending appointments: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params
  const deleteApp = await appSchema.findByIdAndDelete(id)
  if (deleteApp) {
    res.status(200)
  } else {
    res.status(404).json({ msg: "Appointment deletion failed" })
  }

}


const deleteDoctor = async (req, res) => {
  const { id } = req.params
  const doc = await DoctorSchema.findByIdAndDelete(id)
  if (doc) {
    res.status(200)
    await appSchema.findOneAndDelete({ doctor: id })
  }

}





const patientView = async (req, res) => {
  const { id } = req.params;
  const findPatient = await UserSchema.findById(id);
  console.log("findPatient:" + findPatient)
  if (findPatient) {
    res.status(200).json(findPatient)
  } else {
    res.status(404).json({ msg: "Failed to fetch patiend data" })


  }
}

const updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params
  const updateFields = { name, email, phone }
  const findUser = await UserSchema.findByIdAndUpdate(id, updateFields, { new: true })
  if (findUser) {
    res.status(200).json(findUser)
  } else {
    res.status(404).json({ msg: "Failed to update" })
  }

}























module.exports = {
  addusers,
  userlogin,
  docReg,
  doclogin,
  doclist,
  updateDoctorProfile, deleteDoctor,
  findDoc, bookapp, getAppointments, viewUser, deleteUser, docView, appointmentView, appointmentCount, doctorCount, patientCount,
  updateAppointmentStatus, patientView, updateProfile, userAppointmentView, pendingAppointment, approvedappointment, deleteAppointment,
  rejectAppointment
};

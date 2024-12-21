const express = require("express");
const multer = require("multer");
const path = require("path");
const controller = require("./User/Usercontroller"); // Ensure the correct path

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post("/userreg", controller.addusers);
router.post("/login", controller.userlogin);
router.post("/doctorreg", controller.docReg);
router.post("/doclogin", controller.doclogin);
router.get("/doclist", controller.doclist);
router.get("/userprofile/:userId", controller.findDoc);
router.post("/bookapp", controller.bookapp);

router.put("/update/:id", upload.single("profileImage"), controller.updateDoctorProfile);
router.get('/appointment/:doctorId', controller.getAppointments);

router.get('/viewuser', controller.viewUser)
router.delete('/deleteuser/:id', controller.deleteUser)
router.get('/docview', controller.docView)
router.get('/appointmentview', controller.appointmentView)
router.get('/doctorcount', controller.doctorCount)
router.get('/patientcount', controller.patientCount)
router.get('/appointmentcount', controller.appointmentCount)
router.put("/appointment/:id/status", controller.updateAppointmentStatus);
router.post('/patientview/:id', controller.patientView)
router.put('/profileupdate/:id', controller.updateProfile)
router.post('/userAppointmentView/:id', controller.userAppointmentView)

router.get('/pendingappointment/:doctorId', controller.pendingAppointment)
router.get('/approvedappointment/:doctorId', controller.approvedappointment)
router.delete('/deletedoctor/:id', controller.deleteDoctor)
router.put('/deleteappointment/:id/status', controller.rejectAppointment)


module.exports = router;

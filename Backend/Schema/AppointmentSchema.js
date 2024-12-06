const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'docreg', // Ensure this matches your Doctor model name
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"], // Define possible statuses
        default: "pending",
    },
});

module.exports = mongoose.model("Appointment", appSchema);

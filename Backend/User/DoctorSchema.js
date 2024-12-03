const mongoose = require("mongoose")
const docReg = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    specialization: { type: String },
    img: { type: String },
    password: { type: String },
    phone: { type: Number },

})
module.exports = new mongoose.model("docreg", docReg)
const mongoose = require("mongoose")
const users = new mongoose.Schema({
name:{type:String},
email:{type:String},
password:{type:String},
phone:{type:Number}
})
module.exports=new mongoose.model("user",users)
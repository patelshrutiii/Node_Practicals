const mongoose=require("../config/db")
//SCHEMA
var studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    city:String
  }); 
var Student = mongoose.model('Students',studentSchema); //MODEL
module.exports=Student;

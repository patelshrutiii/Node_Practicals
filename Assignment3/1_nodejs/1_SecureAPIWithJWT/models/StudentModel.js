var mongoose = require('../config/db');
var StudentSchema = mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    contactNo:Number
});
var Student=mongoose.model('student',StudentSchema);
module.exports = Student;
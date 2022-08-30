const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    address : String,
    email : String,
    password : String,
    gender : String,
    city : String,
    date : String,
    pic : String
});

module.exports = mongoose.model('users',userSchema);
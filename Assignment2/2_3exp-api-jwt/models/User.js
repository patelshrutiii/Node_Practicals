const mongoose = require('../config/db')


var userSchema=mongoose.Schema({
    username:String,
    password:String
});

var User=mongoose.model('user',userSchema);

module.exports=User;

const mongoose = require('../config/db');
var schema= mongoose.Schema({
    msg:String
});
var Chat=mongoose.model('Chat',schema);
module.exports = Chat;
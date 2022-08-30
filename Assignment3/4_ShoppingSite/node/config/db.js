const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/shoppingDB";
mongoose.connect(url,function(err){
    if(!err){
        console.log('connection done');
    }
    else{
        console.log('connection error');
    }
});
module.exports = mongoose;
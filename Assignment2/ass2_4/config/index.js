const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mylib',{useNewUrlParser : true , useUnifiedTopology : true},(err)=>console.warn(err));


var express = require('express');
var app = express();
var StudentRouter= require('./router/StudentRouter');
var morgan = require('morgan');
var helmet=require('helmet');
var cookieparser=require('cookie-parser');
var {sign,verify} = require('./libs/jwt');

app.use(morgan("combined"));
app.use(helmet());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
//app.use("/students",StudentRouter);
app.use('/students',verify,StudentRouter);
app.get('/gettoken',sign);
app.listen(3333,function(req,res){
    console.log('listening on port number 3333');
})
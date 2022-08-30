var jwt = require('jsonwebtoken');
var jwtkey="key1";
const expsec=3000;
const sign = function(req,res){
    const token= jwt.sign({uname:'user1'},jwtkey,{algorithm:'HS256',expiresIn:expsec});
    console.log(token);
    res.cookie("token",token,{maxAge:expsec*1000});
    res.send(token);
}

const verify = function(req,res,next){
    let token;
    if(req.cookies.token)
    {
        token = req.cookies.token;
        let payload=jwt.verify(token,jwtkey);
        next();
    }
    else{
       res.send('provide token');
    }
}

module.exports = {sign,verify};
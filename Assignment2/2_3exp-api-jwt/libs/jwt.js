

const jwt = require('jsonwebtoken')

var  jwtKey = 'my_secret_key';

  const verify = function(req, res, next){
   
    let token;
    if(req.cookies.token)
    {
         token = req.cookies.token;
         let payload=jwt.verify(token,jwtKey);

        next();
     }
    else
    {
      res.send("provide token")

    }
  }
  
  module.exports = {
    verify  
}  
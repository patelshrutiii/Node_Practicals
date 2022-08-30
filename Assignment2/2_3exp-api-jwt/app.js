////INCLUDES
const express=require("express");
const app=express();
const StudentRouter=require("./routers/StudentRouter");
const helmet = require('helmet');
const morgan = require('morgan');
const cors=require("cors");
const cookieparser = require('cookie-parser')
const path = require('path');
const jwtlib=require("./libs/jwt");
app.use(express.static(path.join(__dirname+'/public')));

//Set config
app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));


app.use(express.urlencoded({extended:true}));
app.use(cookieparser())
app.use(cors())
app.use(helmet());
app.use(morgan("combined"));
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 3000;

const jwt = require('jsonwebtoken')


const User = require('./models/User');
const { check, validationResult } = require('express-validator');


app.get('/signup',function(req,res){
  res.render('signup',{"message":''});
});

app.post('/signup',[
check('username').isEmail() .withMessage("invalid email address").normalizeEmail(),
check('password','Min 8 and Max 10 chars').isLength({ min: 8 , max: 10})
  ],function(req,res){
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send(errors)
  }
  // if(!req.body.username || !req.body.password)
  // {
  // 	res.render('signup',{"message":"enter both username and password"});
    
  // }
  else
  {
    var username=req.body.username;
    var password=req.body.password;

    User.find({username:username},function(error,result){
      if(result.length>0)
      {
        res.render('signup',{"message":"username already exists"});
      }
      else
      {
        var newUser=new User({
          username:username,
          password:password
        });

        newUser.save(function(error,result){
          if(error)
            throw error;
          console.log("user registered");
        });

        jwt.sign(
          {uname:result},
          jwtKey,
          {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
          },
          (err, token) => {
            if (err) throw err;
            // res.status(200).json({
            //   token
            // });
            console.log('token:', token)
            res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
            res.redirect('/student/home');
          }
        );
      }
    });
  }
});	
 

  app.post('/login',function(req,res){

     if(!req.body.username || !req.body.password)
      {
          res.render('login',{"message":"enter both username and pssword"})
      } 
      else{
          var username= req.body.username;
          var password= req.body.password;
        
          User.find({username:username,password:password},function(error,result){
              if(result.length==0)
              {
                  res.render('login',{"message":"please enter correct username or password"}) 
              }
              else{
                // const payload = {
                //   user: {
                //     id: user._id
                //   }
                // };
          
                jwt.sign(
                  //{uname:user._id},
                  {uname:result},
                  jwtKey,
                  {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                  },
                  (err, token) => {
                    if (err) throw err;
                    // res.status(200).json({
                    //   token
                    // });
                    console.log('token:', token)
                    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
                    res.redirect('/student/home');
                  }
                );
              
              }
          })
      }
  })

  app.get('/logout',function(req,res){
      res.clearCookie("token");
      res.redirect('/');
  })


app.get('/',(req,res)=>{
  //  res.redirect('/books/home');
    res.render('login',{"message":''});
  });

//ROUTES
//app.use("/books",BookRouter)
app.use("/student",jwtlib.verify,StudentRouter)
//app.get("/getjwtkey",jwtlib.sign)


app.listen(8000);
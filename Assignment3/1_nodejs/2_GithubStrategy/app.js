const express = require('express')
let flash = require('connect-flash')
const http = require('http')
const session = require('express-session')
const morgan = require('morgan')
const app = express()
const port =  8000

//-------IMP----------
// pass passport object to auth functions
const passport=require('./config/passport') 

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ resave:true, saveUninitialized: false,secret: 'secret' })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.set('view engine', 'ejs')

// load routes and pass in app and configured passport
var routes=require('./routes/user.js')

app.use("/",routes)

app.listen(8000);
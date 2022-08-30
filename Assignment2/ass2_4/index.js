require('./config');
const express = require('express');
const index = express();

const session = require('express-session')


//index.set('view engine', 'pug');
//index.set("static","./View/");

index.set('view engine', 'pug');
index.set('views','./View');

index.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialised : true
}))


index.use(express.urlencoded({extended : true}));

index.get('/image/:name',(req,res)=>{
    res.sendFile(__dirname+`/images/${req.params.name}`)
})

const routes = require('./routes');

index.use('/',routes);

index.listen(8002);
const express = require('express');
const routes = express.Router();
const fileUpload = require('express-fileupload');


const verifyTock = require('../middleware/VerifyTock');

const {display,insert,store,delet,updateDisplay,update,login,home,logout} = require('../controllers/UserController');

routes.get('/',home);
routes.post('/login',login);

routes.get('/display',verifyTock,display);
routes.get('/insert', verifyTock,insert);
routes.post('/store', fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}),store);
routes.get('/delete/:id',verifyTock,delet);

routes.get('/update/:id',verifyTock,updateDisplay);
routes.post('/updateurl',verifyTock,update);

routes.get('/logout',verifyTock,logout);

module.exports = routes;
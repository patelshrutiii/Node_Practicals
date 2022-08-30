const express=require('express');
const multer = require('multer');
const path=require('path');

const app = express();

app.set("view engine", "ejs");

app.use('/upload', express.static('upload'));

app.get("/",function(req,res){
    res.render("form");
 });

var storage = multer.diskStorage({
    destination:function(req,file,cb){
    if(file.mimetype !== 'image/jpeg')
    {
        return cb('invalid file formate');
    }
       cb(null,'./upload');
    },
    filename : function(req,file,cb) { // //filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn’t include any file extension.
		cb(null,file.originalname + "-" +  Date.now() + path.extname(file.originalname))
	}
});


var upload = multer({storage:storage}); // here storage is take from line no. 8 

    //here myProfile is name of input field
   app.post("/upload-profile-pic",upload.single("myProfile"),function(req,res){

    console.log(req.file)
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" width='200' height='100'/><br>`
    return res.send(response)
    });
     

     app.post("/upload-multiple-images",upload.array("Multiple_image",2),function(req,res){
        var response = '<a href="/">Home</a><br>'
        response += "Files uploaded successfully.<br>"
        for(var i=0;i<req.files.length;i++){
            response += `<img src="${req.files[i].path}" width='300' height='300' /><br>`
        }
        
        return res.send(response)
     });

     var server = app.listen(3333,function(){
        console.log("server listening on posrt no.: 3333");
    });



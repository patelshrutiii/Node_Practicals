var mongoose=require('mongoose');
const url= "mongodb://localhost:27017/StudentAPI";
mongoose.connect(url,function(err){
    if(!err)
     console.log('connection successfull')
    else
    {
      console.log("error occured");
    }
});
module.exports = mongoose;
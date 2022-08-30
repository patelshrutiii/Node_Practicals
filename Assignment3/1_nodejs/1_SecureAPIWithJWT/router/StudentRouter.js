const router = require("express").Router();
const Student = require('../models/StudentModel');

router.post("/",function(req,res){
   console.log(req.body);
   var student1=new Student({
    name:req.body.name,
    email:req.body.email,
    age:req.body.age,
    contactNo:req.body.contactNo
   });
   student1.save(function(err,student){
     if(err) return console.log(err);
     id=student._id;
     console.log(student._id + " saved to student collections");
     res.status(200).send(student);
   })
})

router.get("/",function(req,res){
    Student.find(function(err,student){
      if(err) return console.log(err);
      console.log(student);
      res.send(student);
    })
});

router.get("/:id",function(req,res){
	//Get one req.params.id
    Student.findById({"_id":req.params.id}, function (err,student) 
	{
        if (err) return res.status(500).send(
        	"There was a problem finding.");
        if (!student) return res.status(404).send(
        	"No data found.");
        res.status(200).send(student);
    });
});
//http://localhost:3333/students/61ba189eff944938aa121658
router.put('/:id',function(req,res){
    Student.findOneAndUpdate({"_id":req.params.id},req.body,{new:true},function(err,student){
        if(err) return res.status(500).send('problem in updating');
        res.status(200).send(student);
    })
})

router.delete('/:id',function(req,res){
    Student.findOneAndRemove({"_id":req.params.id},function(err,student){
        if(err) return res.status(500).send("problem in deleteing");
        res.status(200).send();
    })
})
module.exports = router;
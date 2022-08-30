var path = require('path');
var express = require('express');
var app = express();
var bodyparser= require('body-parser');
var cors = require('cors');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cors());
var Product = require('./models/productModel');
var multer = require('multer');
app.use(express.static('./upload'));

var storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    },
    destination:function(req,file,cb){
        cb(null,'./upload');
    }
});

var upload = multer({storage:storage});

app.get("/product",function(req,res){
  Product.find(function(err,result){
      if(err) res.status(500).send(err);
      if(!result) res.status(404).send("no product found");
      res.status(200).send(result);
  })
})

app.get('/product/:id',function(req,res){
    Product.findById({_id:req.params.id},function(err,result){
        if(err) res.status(500).send(err);
        if(!result) res.status(404).send("no product ");
        res.status(200).send(result);
    })
})

app.post('/product',upload.single('img'),function(req,res){
    // const file=req.file;
    var p1 = new Product({
        name:req.body.name,
    price:req.body.price,
    mdate:req.body.mdate,
    brand:req.body.brand,
    description:req.body.description,
    // img:file.filename
    })
    p1.save(function(err,result){
        if(err) res.status(500).send(err)
        res.status(200).send(result);
    })
})

app.put('/product/:id',function(req,res){
    console.log(req.body.name);
    console.log(req.body);
    var pro ={
        name:req.body.name,
    price:req.body.price,
    mdate:req.body.mdate,
    brand:req.body.brand,
    description:req.body.description
    // img:res.body.img
    };
    Product.findOneAndUpdate({_id:req.params.id},pro,function(err,result){
        if(err) res.status(500).send(err)
        console.log(result);
        res.status(200).send(result);
    })
})

app.delete('/product/:id',function(req,res){
    Product.findOneAndRemove({_id:req.params.id},function(err,result){
        if(err) res.status(500).send(err);
        res.status(200).send(result);
    })
})

app.listen(3333,function(err){
    console.log("listening on port 3333");
})

// var path = require('path');
// var express = require('express');
// var app = express();
// var bodyparser= require('body-parser');
// var cors = require('cors');
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded());
// app.use(cors());
// var Product = require('./models/productModel');
// var multer = require('multer');
// app.use(express.static('./upload'));

// var storage = multer.diskStorage({
//     filename:function(req,file,cb){
//         cb(null,(file.originalname))
//     },
//     destination:function(req,file,cb){
//         cb(null,'./upload');
//     }
// });

// var upload = multer({storage:storage});

// app.get("/product",function(req,res){
//   Product.find(function(err,result){
//       if(err) res.status(500).send(err);
//       if(!result) res.status(404).send("no product found");
//       res.status(200).send(result);
//   })
// })

// app.get('/product/:id',function(req,res){
//     Product.findById({_id:req.params.id},function(err,result){
//         if(err) res.status(500).send(err);
//         if(!result) res.status(404).send("no product ");
//         res.status(200).send(result);
//     })
// })

// app.post('/product',upload.single('img'),function(req,res){
//      const file=req.file;
//     var p1 = new Product({
//         name:req.body.name,
//     price:req.body.price,
//     mdate:req.body.mdate,
//     brand:req.body.brand,
//     description:req.body.description,
//      img:file.filename
//     })
//     p1.save(function(err,result){
//         if(err) res.status(500).send(err)
//         res.status(200).send(result);
//     })
// })

// app.put('/product/:id',function(req,res){
//     console.log(req.body.name);
//     console.log(req.body);
//     var pro ={
//         name:req.body.name,
//     price:req.body.price,
//     mdate:req.body.mdate,
//     brand:req.body.brand,
//     description:req.body.description,
//      img:res.file.filename
//     };
//     Product.findOneAndUpdate({_id:req.params.id},pro,function(err,result){
//         if(err) res.status(500).send(err)
//         console.log(result);
//         res.status(200).send(result);
//     })
// })

// app.delete('/product/:id',function(req,res){
//     Product.findOneAndRemove({_id:req.params.id},function(err,result){
//         if(err) res.status(500).send(err);
//         res.status(200).send(result);
//     })
// })

// app.listen(3333,function(err){
//     console.log("listening on port 3333");
// })
var mongoose = require('../config/db');
var productSchema=mongoose.Schema({
    name:String,
    price:Number,
    mdate:Date,
    brand:String,
    description:String,
    img:String
});

var Product = mongoose.model('Product',productSchema);
module.exports=Product;
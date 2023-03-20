var mongoose = require("mongoose")

var productSchema = mongoose.Schema({
    productName:String,
    productCat:String,
    price:Number,
    productImage:String,
    color:Array,
    size:Array,
    productDes:String,
    shown:String,
  })
  
  
  module.exports = mongoose.model('product',productSchema)
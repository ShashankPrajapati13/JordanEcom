var mongoose = require("mongoose")
var plm = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/ecom")

var userSchema = mongoose.Schema({
  username:String,
  password:String,
  cart:[{
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
  },
  quantity:{
    type:Number,
    default:1
  },
  size: { 
    type: Number 
  },
  color: { 
    type: String
   },
  }],
  totalamount:{
    type:Number
   },
   address:String,
   order:Array,
})

userSchema.plugin(plm);

module.exports = mongoose.model('user',userSchema)
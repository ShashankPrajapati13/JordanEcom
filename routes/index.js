var express = require('express');
var router = express.Router();
const userSchema = require('./users');
const passport = require('passport');
const passportLocal = require('passport-local');
const productSchema = require('./product');
const product = require('./product');

passport.use(new passportLocal(userSchema.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/register", function (req, res) {
  var newUser = new userSchema({
    name: req.body.name,
    username: req.body.username
  })
  userSchema.register(newUser, req.body.password)
    .then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/home')
      })
    })
    .catch(function(err){
      res.send(err.message)
    })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/'
}), function (req, res, next) {
  res.redirect("/home")
 });

 router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
     if (err) { 
      return next(err); 
    } 
     res.redirect('/');
     });
})

function isLoggedIn(req, res, next) {
if (req.isAuthenticated()) {
  return next();
}
else {
  res.redirect('/');
}
}

router.get('/home',isLoggedIn, async function(req,res){
  try {
    var user = await userSchema.findOne({username: req.session.passport.user})
  var product = await productSchema.find()
  res.render('home',{user,product})
  } catch (error) {
    res.send(error.message)
  }
})
router.get('/filteredProduct/:plc',isLoggedIn, async function(req,res){
  try {
    var cat = req.params.plc
    var user = await userSchema.findOne({username: req.session.passport.user})
  var product = await productSchema.find()
   return res.render('filteredproduct',{user,product,cat})
  
  // var kuch = product.forEach((elem)=>{
  //   console.log((elem.color.map((e)=>{
  //     e===cat
  // } )))
  // })
 console.log(cp)

    
  } catch (error) {
    res.send(error.message)
  }
})
router.get('/Admin',function(req,res){
  
  res.render('productAdmin')
})
router.post('/createProduct',isLoggedIn, function(req,res){
  var product = productSchema.create({
    productName:req.body.productName,
    productCat:req.body.productCat,
    price:req.body.price,
    productImage:req.body.productImage,
    color:req.body.color,
    size:req.body.size,
    productDes:req.body.productDes,
    shown:req.body.shown,
  })
  res.redirect('/Admin')
})

router.get('/product/:plc',isLoggedIn, async function(req,res){
  var user = await userSchema.findOne({username: req.session.passport.user})
  var productId = req.params.plc;
  var product = await productSchema.findOne({_id:productId})
  // console.log(user.cart.map((e)=>e.product._id.toString() == product._id.toString())[0])
  res.render("product",{product,user})
})

router.post('/addtocart/:plc',isLoggedIn, async function(req,res){
  try {
    var user = await userSchema.findOne({username: req.session.passport.user})
  var productId = req.params.plc;
  var {color,size} = req.body
  // console.log(color,size)
  user.cart.push({product:productId})
  var userproduct =  await user.populate("cart.product");
      await user.save();
      userproduct.cart.forEach(async(elem)=>{
        if(elem.product._id == productId){
          elem.color = color
          elem.size = size
          await user.save()
          console.log(elem.product.color,elem.product. size,"incide")
        }
      })
      res.redirect(`/product/${productId}`)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/cart',isLoggedIn, async function(req,res){
  try {
    var user = await userSchema.findOne({username: req.session.passport.user})
  var userproduct =  await user.populate("cart.product");
  var totalprice=0
  userproduct.cart.forEach((e)=>{
    totalprice += e.product.price*e.quantity;
  })
  user.totalamount = totalprice;
  await user.save()
  // console.log(totalprice)
  res.render("cart",{userproduct})
  console.log(userproduct.totalamount)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/removeProduct/:plc',isLoggedIn,async function(req,res){
  try {
        var user = await userSchema.findOne({username: req.session.passport.user})  
        let product =  req.params.plc
        // console.log(user.cart.findIndex((e)=>e.product== product),product)
        user.cart.splice(user.cart.findIndex((e)=>e.product== product), 1)
        await user.save()
        res.redirect("/cart")
  } catch (err) {
    res.send(err.message)
  }
})

router.post('/updatequantity/:plc',isLoggedIn, async function(req,res){
  try {
        var user = await userSchema.findOne({username: req.session.passport.user})  
        let id =  req.params.plc
        let Quantity = req.body.quantity
        //  let iproduct = await productSchema.findOne({_id:id})
         console.log(id,Quantity)
         await user.populate("cart.product")
         user.cart.forEach(async elem => {
          if(elem.product._id.toString()===id.toString()){
            elem.quantity= Quantity
            // var updatedUser = await userSchema.findOneAndUpdate({username: user.username},{quantity:quantity+1},{new:true})
            // console.log(elem.product._id.toString(),id)
          }
        });
      
        await user.save()
        console.log(user)
        
        res.redirect('/cart')
  } catch (err) {
    res.send(err.message)
  }
})
router.get('/cart/minus/:plc',isLoggedIn, async function(req,res){
  try {
        var user = await userSchema.findOne({username: req.session.passport.user})  
        let id =  req.params.plc
          user.cart.forEach(async elem => {
            if(elem.quantity>1){
            if(elem.product._id.toString()===id.toString()){
              elem.quantity -= 1
              // var updatedUser = await userSchema.findOneAndUpdate({username: user.username},{quantity:quantity+1},{new:true})
          
            }
        await user.save()
        // console.log(product.quantity)
        }
      })
        res.redirect('/cart')
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = router;

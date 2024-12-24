const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require('../models/product')
const userModel = require('../models/user')


router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", {error, loggedin: false});
});
 
router.get("/shop", isLoggedIn, async function (req, res) {
  const products = await productModel.find();
  const success = req.flash("success");
  res.render("shop", {products, success});
});

router.get("/addtocart/:id", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({email: req.user.email})
  user.cart.push(req.params.id)
  await user.save();
  req.flash("success","Added to cart successfully");
  res.redirect("/shop")
});

router.get('/cart', isLoggedIn, async function (req,res) {
  const user = await userModel.findOne({email : req.user.email}).populate("cart")
  res.render("cart", { user })
})

router.get('/logout', isLoggedIn, function (req,res) {
  res.cookie('token',"");
  const error = req.flash("error")
  res.render("index", {error, loggedin: false});
})

module.exports = router;

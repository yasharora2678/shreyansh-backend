const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require('../models/product')

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", {error});
});

router.get("/shop", isLoggedIn, async function (req, res) {
  const products = await productModel.find();
  res.render("shop", {products});
});

router.get('/logout', isLoggedIn, function (req,res) {
  res.render("shop");
})

module.exports = router;

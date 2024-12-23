const express = require("express");
const upload = require("../config/multer");
const router = express.Router();
const prodcutModel = require("../models/product");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const product = await prodcutModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully.")
    res.redirect('/shop');
  } catch (error) {
    res.send(error.message)
  }
});

module.exports = router;

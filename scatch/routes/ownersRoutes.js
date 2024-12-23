const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    try {
      const { fullname, email, password, products, picture, gstin } = req.body;

      // Validate the incoming request
      if (!fullname || !email || !password || !picture || !gstin) {
        return res.status(400).send("All fields are required");
      }

      // Check if an owner already exists
      let owners = await ownerModel.find();
      console.log(owners);
      if (owners.length) {
        return res.status(500).send("Owner already present");
      }

      // Create a new owner
      const owner = await ownerModel.create({
        fullname,
        email,
        password,
        products: products || [], // Default to an empty array if not provided
        picture,
        gstin,
      });

      res.status(201).send(owner);
    } catch (error) {
      console.error("Error creating owner:", error);
      res.status(500).send("An error occurred while creating the owner");
    }
  });
}

router.get("/admin", function (req, res) {
  const success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;

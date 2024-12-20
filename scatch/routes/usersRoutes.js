const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
router.get("/", function (req, res) {
  res.send("Hey");
});

router.post("/register", async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    const user = await userModel.create({
      email,
      password,
      fullname,
    });
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

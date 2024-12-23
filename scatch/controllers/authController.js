const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

exports.registerUser = async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    const existingUser = await userModel.findOne({email});
    if(existingUser) {
        return res.status(409).send({message: "User already exists"})
    }
    const updatePassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      password: updatePassword,
      fullname,
    });
    const token = generateToken(user);
    res.cookie("token", token);
    res.send("User created successfully");
  } catch (error) {
    console.log(error.message);
  }
};

exports.loginUser = async function (req,res) {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({email});
    if(!existingUser) {
        return res.status(400).send({message: "Bad request. Check the payload"})
    }
    const isPassword = await bcrypt.compare(
        password,
        existingUser.password
    );
    
    if(!isPassword) {
        return res.status(400).send({message: "Invalid Credentials"})
    }
    const token = generateToken(existingUser);
    res.cookie("token", token);
    res.redirect("/shop");
}

exports.logOut = async function (req,res) {
    res.cookie("token", "");
    res.redirect('/')
}
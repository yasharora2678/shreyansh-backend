const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const userModel = require("./user-model");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", function (req, res) {
  res.render("welcome");
});

app.get("/logout", (req, res) => {
  res.cookie('token',"");
  res.render("index");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({email})
  if(!user) return res.send('Something went wrong')
    console.log(user)
  await bcrypt.compare(
    password,
    user.password
  );
  const token = jwt.sign({ username: user.username, email }, "secret");
  res.cookie("token", token);
  res.render("welcome", { username: user.username });
});

app.get("/login", (req, res) => {
  res.render('login')
});

app.post("/create", async function (req, res) {
  const { username, password } = req.body;
  const updatedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email: "yash@gmail.com",
    password: updatedPassword,
    age: 18,
  });
  const token = jwt.sign({ username: user.username, email: "yash@gmail.com" }, "secret");
  res.cookie("token", token);
  res.render("welcome", { username });
});

app.listen(8080);

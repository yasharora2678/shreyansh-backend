const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.cookie("name", "Yash");
  res.send("This is Authentication and Authorization");
});

app.get("/read", function (req, res) {
  bcrypt.hash("Yash1234@", 10, function (err, hash) {
    console.log(hash);
  });
  res.send("Reading Page");
});

app.get("/compare", async function (req, res) {
  const isPasswordMatched = await bcrypt.compare(
    "Yash1234@",
    "$2b$10$WqLenoSsTb6p5dJ7Rppm7u8rqrIJKWDmjcwmdXSyjXnKkMjlESc4O"
  );
  res.send(isPasswordMatched);
});

app.get("/jwt", (req, res) => {
  const token = jwt.sign({ name: "Yash", email: "yash@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("JWT Implemented");
});

app.get("/check-jwt", function (req,res) {
    console.log(req.cookies)
    const data = jwt.verify(req.cookies.token,"secret")
    res.send(data)
});
app.listen(8080);

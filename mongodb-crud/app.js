const express = require("express");
const app = express();
const userModel = require("./user-model");

require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hey");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    name: "Harsh",
    email: "harsh@gmail.com",
    username: "harsh",
  });

  res.send(user);
});

app.get("/update", async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { username: "harsh" },
    {
      name: "Harsh Sharma",
    },
    { new: true }
  );

  res.send(user);
});

app.get("/read", async (req, res) => {
  const user = await userModel.findOne({ username: "harsh" });
  res.send(user);
});

app.get("/readAll", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

app.get("/delete", async (req, res) => {
    await userModel.findOneAndDelete({ username: "harsh" });
    res.send("User Deleted Successfully!!");
});
app.listen(8080);

const express = require("express");
const app = express();
const path = require('path');
const userModel = require("./user-model");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  const {email, name, imageUrl} = req.body;
  await userModel.create({
    name: name,
    email: email,
    username: imageUrl,
  });

  res.redirect("/read")
});

app.post("/edit", async (req, res) => {
  const {new_name,prev_name}= req.body;
  console.log(prev_name, new_name)
  const user = await userModel.findOneAndUpdate(
    { name: prev_name },
    {
      name: new_name,
    },
    { new: true }
  );
  console.log(user)
  res.redirect("/read")
});

app.get("/read", async (req, res) => {
  const users = await userModel.find();
  res.render('read', {users});
});

app.get("/edit/:username", (req,res) => {
  res.render('edit',{username:req.params.username})
})

app.get("/delete/:username", async (req, res) => {
    await userModel.findOneAndDelete({ name: req.params.username });
    res.redirect("/read")
});

app.listen(8080);

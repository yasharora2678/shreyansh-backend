const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("./config/multer");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

connectDB();

app.get("/", function (req, res) {
  res.render("login");
});

app.get("/signup", function (req, res) {
  res.render("index");
});

app.post("/create", upload.single("image"), async function (req, res) {
  const { username, name, email, age, password } = req.body;
  console.log(req.file)
  const user = await userModel.findOne({ email });
  const updatedPassword = await bcrypt.hash(password, 10);
  if (user) {
    return res.status(400).send("User already exists");
  }
  const response = await userModel.create({
    username,
    name,
    email,
    age,
    password: updatedPassword,
    posts: [],
    image: req.file.filename
  });

  const token = jwt.sign(
    { userId: response._id, email: response.email },
    "secret"
  );
  res.cookie("token", token);
  return res.status(201).send("User registered successfully");
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).send("Something went wrong");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(400).send("Something went wrong");
  }
  const token = jwt.sign({ userId: user._id, email: user.email }, "secret");
  res.cookie("token", token);
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async function (req, res) {
  const { userId } = req.user;
  const { content } = req.body;
  const post = await postModel.create({
    content,
    user: userId,
    likes: [],
  });
  await userModel.findByIdAndUpdate(
    { _id: userId },
    { $push: { posts: post._id } },
    { new: true }
  );
  res.redirect("/profile");
});

app.post("/post/:postId/like", isLoggedIn, async function (req, res) {
  const { userId } = req.user;
  const { postId } = req.params;
  const post = await postModel.findById({ _id: postId });
  if (post.likes.indexOf(req.user.userId) === -1) {
    await postModel.findByIdAndUpdate(
      { _id: post._id },
      { $push: { likes: userId } },
      { new: true }
    );
  } else {
    post.likes.splice(post.likes.indexOf(userId), 1);
    await post.save();
  }
  res.redirect("/profile");
});

app.post("/post/:postId/delete", isLoggedIn, async function (req, res) {
  const { postId } = req.params;
  await postModel.findByIdAndDelete({ _id: postId });
  res.redirect("/profile");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/profile", isLoggedIn, async function (req, res) {
  const { email } = req.user;
  const user = await userModel.findOne({ email }).populate("posts");
  const posts = await postModel.find().populate("user");
  res.render("welcome", { username: user.username, image: user.image, posts: posts });
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token === "") {
    return res.status(401).send("You must be logged in");
  } else {
    const data = jwt.verify(token, "secret");
    req.user = data;
    next();
  }
}

app.listen(8080);

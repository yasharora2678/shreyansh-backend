const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require('./routes/ownersRoutes') 
const productsRouter = require('./routes/productsRoutes') 
const usersRouter = require('./routes/usersRoutes') 

const connectDB = require("./config/mongoose-connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

connectDB();

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(8080);
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require('./routes/ownersRoutes') 
const productsRouter = require('./routes/productsRoutes') 
const usersRouter = require('./routes/usersRoutes') 
const route = require('./routes')
const session = require('express-session');
const flash = require("connect-flash");
const connectDB = require("./config/mongoose-connection");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

connectDB();
app.use("/",route)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(8080);
const mongoose = require("mongoose");
const config = require("config");

const dbgr = require('debug')("development:mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection has been established successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

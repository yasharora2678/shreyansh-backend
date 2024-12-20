const mongoose = require("mongoose");
const config = require("config");

const dbgr = require('debug')("development:mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${config.get("MONGODB_URL")}`);
    dbgr("Database connection has been established successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

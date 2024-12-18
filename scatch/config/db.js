const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connection has been established successfully");
}

module.exports = connectDB;
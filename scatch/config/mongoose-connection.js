const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection has been established successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

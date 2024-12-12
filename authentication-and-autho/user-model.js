const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
})

module.exports = mongoose.model("user",userSchema);
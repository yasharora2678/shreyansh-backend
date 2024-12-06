const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const userSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    email: String
})

module.exports = mongoose.model("user",userSchema);
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: {
        type: Array,
        of: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = mongoose.model("user",userSchema);
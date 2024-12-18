const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    of: mongoose.Schema.Types.ObjectId,
    ref: "product",
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: Array,
    of: mongoose.Schema.Types.ObjectId,
    ref: "product",
    default: []
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);

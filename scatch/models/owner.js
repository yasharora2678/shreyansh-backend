const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  poducts: {
    type: Array,
    of: mongoose.Schema.Types.ObjectId,
    ref: "product",
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);

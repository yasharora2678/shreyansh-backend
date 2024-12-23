const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.isLoggedIn = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "somethign went wrong");
    return res.redirect("/");
  }
};

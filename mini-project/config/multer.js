const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    console.log(file)
    crypto.randomBytes(12, function (err, bytes) {
      cb(
        null,
        file.fieldname +
          "-" +
          bytes.toString("hex") +
          path.extname(file.originalname)
      );
    });
  },
});

const upload = multer({ storage: storage });
module.exports = upload;

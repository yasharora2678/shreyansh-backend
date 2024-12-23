const jwt = require('jsonwebtoken')

function generateToken(user){
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
    return token;
}


module.exports.generateToken = generateToken
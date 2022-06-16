//  auth middleware to check if the user is authorized or not

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const secretKey = process.env.JWT_SECRET
        const token = req.header('x-auth-token');
        jwt.verify(token, secretKey);
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid Token, can not authorize user! 🔴"})
    }
}

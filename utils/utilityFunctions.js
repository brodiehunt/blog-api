const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (userId) => {
    const token = jwt.sign({sub: userId}, process.env.JWT_SECRET)
    return token;
}

const generateApiKey = () => {
    return crypto.randomBytes(32).toString('hex');
}



module.exports = {
    generateToken,
    generateApiKey
}
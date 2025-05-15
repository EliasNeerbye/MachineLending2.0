const jwt = require('jsonwebtoken');
const config = require('./config');

const generateToken = (userId, role) => {
    return jwt.sign(
        { 
            userId: userId,
            role: role 
        },
        config.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
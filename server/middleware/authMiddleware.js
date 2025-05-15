const { verifyToken } = require('../utils/jwtFunctions');
const { getAuthToken } = require('../utils/cookieUtils');

const authenticate = (req, res, next) => {
    try {
        const token = getAuthToken(req);
        
        if (!token) {
            next();
        } else {
            const decoded = verifyToken(token);
            req.user = {
                userId: decoded.userId,
                role: decoded.role
            };

            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticate,
};
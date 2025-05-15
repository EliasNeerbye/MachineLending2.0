const { clearAuthCookie } = require('../../utils/cookieUtils');

module.exports = async (req, res) => {
    
    if (!req.user) {
        return res.status(400).json({ message: 'You need to log in to log out' });
    }

    
    clearAuthCookie(res);

    
    return res.status(200).json({ message: 'Logged out successfully' });
};
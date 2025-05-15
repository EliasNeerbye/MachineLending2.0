const User = require('../../models/User');
const { verifyPassword } = require('../../utils/hashFunctions');
const { generateToken } = require('../../utils/jwtFunctions');
const { setAuthCookie } = require('../../utils/cookieUtils');

module.exports = async (req, res) => {
    if (req.user) {
        return res.status(400).json({ message: 'Already logged in' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await User.find({ email });
        if (!existingUser) {
            return res.status(400).json({message: "User does not exist"});
        }

        const isPasswordValid = await verifyPassword(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = generateToken(existingUser._id, existingUser.role);
        setAuthCookie(res, token);

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
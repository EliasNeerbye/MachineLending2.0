const User = require('../../models/User');
const { hashPassword } = require('../../utils/hashFunctions');

module.exports = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(400).json({ message: 'You need to log in and be admin to create a user' });
    }

    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        if (role) {
            newUser.role = role;
        }
        await newUser.save();
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
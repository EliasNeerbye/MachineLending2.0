const User = require('../../models/User');
const { hashPassword } = require('../../utils/hashFunctions');

const setupUsers = async () => {
    try {
        console.log('Setting up default admin user...');
        
        // Always clear existing admin users to avoid duplicates
        await User.deleteMany({ role: 'admin' });
        
        // Create default admin user with standard password
        const hashedPassword = await hashPassword('admin123');
        await User.create({
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });
        
        console.log('Default admin user created successfully');
    } catch (error) {
        console.error('Error creating default admin:', error);
        throw error;
    }
};

module.exports = { setupUsers };

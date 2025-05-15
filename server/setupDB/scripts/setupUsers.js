const User = require('../../models/User');
const { hashPassword } = require('../../utils/hashFunctions');

const setupUsers = async () => {
    try {
        console.log('Setting up default admin user...');
        
        
        await User.deleteMany({ role: 'admin' });
        
        
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

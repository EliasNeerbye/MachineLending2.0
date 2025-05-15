const argon2 = require('argon2');

const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Hashing failed');
    }
}

const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await argon2.verify(hashedPassword, password);
        return isMatch;
    } catch (err) {
        console.error('Error verifying password:', err);
        throw new Error('Verification failed');
    }
}

module.exports = {
    hashPassword,
    verifyPassword
}
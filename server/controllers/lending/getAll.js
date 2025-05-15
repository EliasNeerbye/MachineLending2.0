const Lending = require('../../models/Lending');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const lendings = await Lending.find()
            .populate('machine')
            .populate('person')
            .sort({ createdAt: -1 });

        return res.status(200).json({ 
            message: 'Lendings retrieved successfully', 
            lendings 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
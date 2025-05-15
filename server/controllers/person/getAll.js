const Person = require('../../models/Person');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const people = await Person.find();
        if (!people || people.length === 0) {
            return res.status(404).json({ message: 'No people found' });
        }
        return res.status(200).json({ message: 'People retrieved successfully', people });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
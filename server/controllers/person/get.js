const Person = require('../../models/Person');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Person ID is required' });
    }

    try {
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        return res.status(200).json({ message: 'Person retrieved successfully', person });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
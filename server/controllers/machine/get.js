const Machine = require('../../models/Machine');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Machine ID is required' });
    }
    try {
        const machine = await Machine.findById(id);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        return res.status(200).json({ message: 'Machine retrieved successfully', machine });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
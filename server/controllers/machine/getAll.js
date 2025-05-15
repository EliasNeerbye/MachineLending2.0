const Machine = require('../../models/Machine');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const machines = await Machine.find();
        if (!machines || machines.length === 0) {
            return res.status(404).json({ message: 'No machines found' });
        }
        return res.status(200).json({ message: 'Machines retrieved successfully', machines });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
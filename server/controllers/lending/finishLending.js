const Lending = require('../../models/Lending');
const Machine = require('../../models/Machine');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Lending ID is required' });
    }

    try {
        const lending = await Lending.findById(id);
        if (!lending) {
            return res.status(404).json({ message: 'Lending record not found' });
        }

        if (lending.status !== 'active') {
            return res.status(400).json({ message: 'This lending is not active' });
        }

        lending.status = 'completed';
        lending.endDate = new Date();

        const machine = await Machine.findById(lending.machine);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        machine.status = 'available';

        await Promise.all([
            lending.save(),
            machine.save()
        ]);

        const populatedLending = await Lending.findById(lending._id)
            .populate('machine')
            .populate('person');

        return res.status(200).json({ 
            message: 'Lending completed successfully', 
            lending: populatedLending 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
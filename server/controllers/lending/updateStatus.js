const Lending = require('../../models/Lending');
const Machine = require('../../models/Machine');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Lending ID is required' });
    }

    if (!status || !['active', 'completed', 'canceled'].includes(status)) {
        return res.status(400).json({ 
            message: 'Valid status is required (active, completed, or canceled)' 
        });
    }

    try {
        const lending = await Lending.findById(id);
        if (!lending) {
            return res.status(404).json({ message: 'Lending record not found' });
        }

        if ((lending.status === 'completed' || lending.status === 'canceled') && status === 'active') {
            return res.status(400).json({ 
                message: 'Cannot change completed or canceled lending back to active' 
            });
        }

        const machine = await Machine.findById(lending.machine);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }

        if (status === 'canceled' || status === 'completed') {
            machine.status = 'available';
            if (status === 'completed') {
                lending.endDate = new Date();
            }
        } else if (status === 'active') {
            machine.status = 'lended';
        }

        lending.status = status;

        await Promise.all([
            lending.save(),
            machine.save()
        ]);

        const populatedLending = await Lending.findById(lending._id)
            .populate('machine')
            .populate('person');

        return res.status(200).json({ 
            message: 'Lending status updated successfully', 
            lending: populatedLending 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
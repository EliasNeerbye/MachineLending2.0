const Lending = require('../../models/Lending');
const Machine = require('../../models/Machine');
const Person = require('../../models/Person');

module.exports = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { machineId, personId, startDate } = req.body;

    if (!machineId || !personId || !startDate) {
        return res.status(400).json({ message: 'Machine ID, person ID, and start date are required' });
    }

    try {
        const machine = await Machine.findById(machineId);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        if (machine.status !== 'available') {
            return res.status(400).json({ message: 'Machine is not available for lending' });
        }

        const person = await Person.findById(personId);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        const lending = new Lending({
            machine: machineId,
            person: personId,
            startDate: new Date(startDate),
            status: 'active'
        });

        machine.status = 'lended';
        
        await Promise.all([
            lending.save(),
            machine.save()
        ]);

        const populatedLending = await Lending.findById(lending._id)
            .populate('machine')
            .populate('person');

        return res.status(201).json({ 
            message: 'Machine lent successfully', 
            lending: populatedLending 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
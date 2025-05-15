const Machine = require('../../models/Machine');

module.exports = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Machine ID is required' });
    }

    const { machineName, brand, model, serialNumber } = req.body;

    if (!machineName && !brand && !model && !serialNumber) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    }

    try {
        const machine = await Machine.findById(id);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        if (machineName) machine.machineName = machineName;
        if (brand) machine.brand = brand;
        if (model) machine.model = model;
        if (serialNumber) machine.serialNumber = serialNumber;
        await machine.save();
        return res.status(200).json({ message: 'Machine updated successfully', machine });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
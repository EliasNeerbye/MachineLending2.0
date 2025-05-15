const Machine = require('../../models/Machine');

module.exports = async (req, res) => {
    const { machineName, brand, model, serialNumber } = req.body;

    if (!machineName || !brand || !model || !serialNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newMachine = new Machine({
            machineName,
            brand,
            model,
            serialNumber,
        });

        await newMachine.save();

        return res.status(201).json({ message: 'Machine registered successfully', machine: newMachine });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
const Person = require('../../models/Person');

module.exports = async (req, res) => {
    const { firstName, lastName, email, phone, street, city, state, zipCode, dateOfBirth } = req.body;
    if (!firstName || !lastName || !email || !phone || !street || !city || !state || !zipCode || !dateOfBirth) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {        const existingPerson = await Person.findOne({ email });
        if (existingPerson) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newPerson = new Person({
            firstName,
            lastName,
            email,
            phone,
            address: {
                street,
                city,
                state,
                zipCode
            },
            dateOfBirth
        });
        await newPerson.save();
        return res.status(201).json({ message: 'Person registered successfully', person: newPerson });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
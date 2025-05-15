const Person = require('../../models/Person');

module.exports = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Person ID is required' });
    }

    const { firstName, lastName, email, phone, street, city, state, zipCode, dateOfBirth } = req.body;

    if (!firstName && !lastName && !email && !phone && !street && !city && !state && !zipCode && !dateOfBirth) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    }

    try {
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        if (firstName) person.firstName = firstName;
        if (lastName) person.lastName = lastName;
        if (email) person.email = email;
        if (phone) person.phone = phone;
        if (dateOfBirth) person.dateOfBirth = dateOfBirth;

        if (street || city || state || zipCode) {
            person.address = {
                ...person.address,
                ...(street && { street }),
                ...(city && { city }),
                ...(state && { state }),
                ...(zipCode && { zipCode })
            };
        }

        await person.save();
        return res.status(200).json({ message: 'Person updated successfully', person });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
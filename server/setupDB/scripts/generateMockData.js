const { faker } = require('@faker-js/faker');
const Machine = require('../../models/Machine');
const Person = require('../../models/Person');

const generateMockMachines = async (count = 50) => {
    const machines = [];
    const brands = ['HP', 'Dell', 'Lenovo', 'Apple', 'Asus'];
    const models = ['Laptop Pro', 'Desktop Elite', 'Workstation X', 'Server Plus', 'Tablet Air'];
    
    for (let i = 0; i < count; i++) {
        machines.push({
            machineName: `TEST-${faker.string.alphanumeric(8).toUpperCase()}`,
            brand: faker.helpers.arrayElement(brands),
            model: faker.helpers.arrayElement(models),
            serialNumber: faker.string.alphanumeric(10).toUpperCase(),
            status: faker.helpers.arrayElement(['available', 'unavailable']),
            notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 })
        });
    }

    await Machine.insertMany(machines);
    console.log(`Generated ${count} mock machines`);
};

const generateMockPeople = async (count = 100) => {
    const people = [];
    const departments = ['IT', 'HR', 'Finance', 'Engineering', 'Marketing', 'Sales'];
    
    for (let i = 0; i < count; i++) {
        people.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number('+47 ### ## ###'),
            department: faker.helpers.arrayElement(departments),
            employeeId: faker.string.alphanumeric(6).toUpperCase(),            dateOfBirth: faker.date.between({ from: '1960-01-01', to: '2000-12-31' }),
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zipCode: faker.location.zipCode()
            }
        });
    }

    await Person.insertMany(people);
    console.log(`Generated ${count} mock people`);
};

const generateMockData = async (option) => {
    try {
        console.log(`Generating mock ${option}...`);
        
        switch (option) {
            case 'generate mock machines':
                await generateMockMachines();
                break;
            case 'generate mock people':
                await generateMockPeople();
                break;
            default:
                throw new Error(`Unknown mock data type: ${option}`);
        }
    } catch (error) {
        console.error('Error generating mock data:', error);
        throw error;
    }
};

module.exports = { generateMockData };

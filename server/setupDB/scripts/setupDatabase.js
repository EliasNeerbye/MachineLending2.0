const mongoose = require('mongoose');
const config = require('../../utils/config');
const { setupUsers } = require('./setupUsers');
const { importMachines } = require('./importMachines');
const { importPeople } = require('./importPeople');
const { generateMockData } = require('./generateMockData');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const parseOptions = (options = {}) => {
    return {
        mode: options.mode || 'testing',
        clearDatabase: options.clear !== false,
        skipAdmin: options.skipAdmin || false,
        skipMachines: options.skipMachines || false,
        skipPeople: options.skipPeople || false
    };
};

const setupDatabase = async (rawOptions = {}) => {
    try {
        const options = parseOptions(rawOptions);
        await connectDB();

        if (options.clearDatabase) {
            console.log('Clearing database...');
            await mongoose.connection.dropDatabase();
        }

        if (!options.skipAdmin) {
            await setupUsers();
        }

        if (!options.skipMachines) {
            if (options.mode === 'production') {
                await importMachines();
            } else {
                await generateMockData('generate mock machines');
            }
        }

        if (!options.skipPeople) {
            if (options.mode === 'production') {
                await importPeople();
            } else {
                await generateMockData('generate mock people');
            }
        }

        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Error during database setup:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
};

module.exports = { setupDatabase };

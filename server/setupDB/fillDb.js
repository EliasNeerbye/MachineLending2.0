const fs = require('fs');
const { parse } = require('csv-parse');
const mongoose = require('mongoose');
const path = require('path');
const Machine = require('../models/Machine');
const User = require('../models/User');
const { hashPassword } = require('../utils/hashFunctions');
const config = require('../utils/config');

const csvFilePath = path.join(__dirname, 'machines.csv');


const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};


const processFile = () => {
    return new Promise((resolve, reject) => {
        const records = [];
        fs.createReadStream(csvFilePath, { encoding: 'utf8' })
            .pipe(parse({
                columns: true,
                skip_empty_lines: true,
                delimiter: ',',
                bom: true,
                trim: true
            }))
            .on('data', (record) => {
                const machineRecord = {
                    machineName: record['Maskinnavn'],
                    brand: record.Merke,
                    model: record.Modell,
                    serialNumber: record.Serienummer,
                    status: record.Status.toLowerCase() === 'ledig' ? 'available' : 'unavailable'
                };
                records.push(machineRecord);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve(records);
            })
            .on('error', (error) => {
                console.error('Error processing CSV file:', error);
                reject(error);
            });
    });
};


const importMachines = async () => {
    try {
        const machines = await processFile();
        console.log(`Found ${machines.length} machines in CSV file`);

        
        if (process.argv.includes('--clear')) {
            console.log('Clearing existing machines...');
            await Machine.deleteMany({});
        }

        
        await Machine.insertMany(machines);
        console.log('Machines imported successfully');

    } catch (error) {
        console.error('Error importing machines:', error);
        throw error;
    }
};


const createDefaultAdmin = async () => {
    try {
        
        await User.deleteMany({ role: 'admin' });
        
        
        const hashedPassword = await hashPassword('admin123');
        await User.create({
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });
        
        console.log('Default admin user created successfully');

    } catch (error) {
        console.error('Error creating default admin:', error);
        throw error;
    }
};


const setupDatabase = async () => {
    try {
        await connectDB();

        if (process.argv.includes('--clear')) {
            console.log('Clearing entire database...');
            await mongoose.connection.dropDatabase();
            console.log('Database cleared');
        }

        await createDefaultAdmin();
        await importMachines();

        console.log('Database setup completed successfully');
        
    } catch (error) {
        console.error('Error during database setup:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};


setupDatabase();
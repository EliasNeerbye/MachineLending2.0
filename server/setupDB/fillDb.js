const fs = require('fs');
const csv = require('csv-parse');
const mongoose = require('mongoose');
const config = require('../utils/config');
const Machine = require('../models/Machine');
const path = require('path');

const csvFilePath = path.join(__dirname, 'machines.csv');

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

const processFile = async () => {
    const records = [];    const parser = fs
        .createReadStream(csvFilePath, { encoding: 'utf8' })
        .pipe(csv.parse({
            columns: true,
            skip_empty_lines: true,
            delimiter: ',',
            bom: true,
            trim: true
        }));

    for await (const record of parser) {
        const machineRecord = {
            machineName: record['Maskinnavn'],
            brand: record.Merke,
            model: record.Modell,
            serialNumber: record.Serienummer,
            status: record.Status.toLowerCase() === 'ledig' ? 'available' : 'unavailable'
        }; 
        records.push(machineRecord);
    }
    console.log('Total records processed:', records.length); 
    return records;
};

const importMachines = async () => {
    try {
        const machines = await processFile();
        console.log(`Importing ${machines.length} machines...`);
        
        await Machine.deleteMany({}); 
        await Machine.insertMany(machines);
        
        console.log('Import completed successfully!');
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error during import:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

importMachines();
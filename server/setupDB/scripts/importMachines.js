const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const Machine = require('../../models/Machine');

const importMachines = async () => {
    try {
        const csvFilePath = path.join(__dirname, '../data/production/machines.csv');
        
        if (!fs.existsSync(csvFilePath)) {
            console.error('No machines.csv file found in production data directory');
            return;
        }

        const machines = await new Promise((resolve, reject) => {
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

        console.log(`Found ${machines.length} machines in CSV file`);
        await Machine.insertMany(machines);
        console.log('Machines imported successfully');

    } catch (error) {
        console.error('Error importing machines:', error);
        throw error;
    }
};

module.exports = { importMachines };

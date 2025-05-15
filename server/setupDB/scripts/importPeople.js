const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const Person = require('../../models/Person');

const importPeople = async () => {
    try {
        const csvFilePath = path.join(__dirname, '../data/production/people.csv');
        
        if (!fs.existsSync(csvFilePath)) {
            console.error('No people.csv file found in production data directory');
            return;
        }

        const people = await new Promise((resolve, reject) => {
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
                    records.push(record);
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

        console.log(`Found ${people.length} people in CSV file`);
        await Person.insertMany(people);
        console.log('People imported successfully');

    } catch (error) {
        console.error('Error importing people:', error);
        throw error;
    }
};

module.exports = { importPeople };

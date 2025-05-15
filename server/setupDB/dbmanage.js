#!/usr/bin/env node
const { program } = require('commander');
const { setupDatabase } = require('./scripts/setupDatabase');


const BLUE = '\x1b[34m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const printBanner = () => {
    console.log(BLUE + `
╔═══════════════════════════════════════════════╗
║             Machine Lending 2.0               ║
║          Database Management Tool             ║
╚═══════════════════════════════════════════════╝
` + RESET);
};

program
    .name('dbsetup')
    .description('Machine Lending 2.0 Database Management Tool')
    .version('1.0.0')
    .option('-m, --mode <mode>', 'setup mode (production/testing)', 'testing')
    .option('--no-clear', 'do not clear the database before setup')
    .option('--skip-admin', 'skip creating default admin user')
    .option('--skip-machines', 'skip machines setup')
    .option('--skip-people', 'skip people setup')
    .action(async (options) => {
        printBanner();
        
        try {            await setupDatabase(options);
            process.exit(0);
        } catch (error) {
            console.error(RED + 'Setup failed:' + RESET, error.message);
            process.exit(1);
        }
    });


program.parse();
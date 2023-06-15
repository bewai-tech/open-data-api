/* eslint-disable @typescript-eslint/no-var-requires */
const execSync = require('child_process').execSync;

require('dotenv').config();

// Execute the command...
console.log('1. START PM2 PROCESS');
execSync(`pm2-runtime start dist/app.js --name opendataapi-${process.env.APP_ENV}`, { stdio: 'inherit' });

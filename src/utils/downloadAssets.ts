import { createWriteStream, unlink, unlinkSync } from 'fs';
import { get } from 'https';
import { extname, join } from 'path';
import axios from 'axios';

import config from '../config/config';
import { createUnzip } from 'zlib';

/**
 * Remote open data sources are configured into the .env file at the root of the project
 * Make sure to expose new variables for new sources in the `config.ts` file located in the `src/config` folder
 */
const dataSets = {
    sirene: config.opendataRemoteSources.sirene,
    departementsfr: config.opendataRemoteSources.departementsfr,
    ban: config.opendataRemoteSources.ban
};

// Get the arguments
const dataSetName = process.argv[2]; // dataset name

const downloadDataSet = async (dataSetType = '', dest = join(process.cwd(), '/assets')) => {

    if (!dataSetName) {
        console.log(`
            Please provide as argument the dataset name you want to download ${Object.keys(dataSets).join(' / ')})
        `);
    }

    // In case of no matching dataset found
    if (!Object.keys(dataSets).includes(dataSetType)) {
        throw Error(`No dataset with key "${dataSetType}" exists. Please check available datasets in the docs.`);
    }

    // Get last updated data set (id) from ODS Sirene API
    if (dataSetType === 'sirene') {
        try {
            const response = await axios.get(dataSets.sirene);
            const exportId = response?.data?.static_exports[0]?.static_export?.export_id;

            // Append export id to the ODS url
            if (response.data && exportId) {
                dataSets.sirene += exportId;
                console.log(`Grabbed last ODS Sirene build (${exportId})`);
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    const originalExt = extname(dataSets[dataSetType]);
    const filePath = join(dest, `${dataSetType}.csv`);

    // Delete existing file based on the filename contained in the URL
    try {
        unlinkSync(filePath);
        console.log('Existing file deleted.');
    } catch (error) {
        //
    }

    const file = createWriteStream(filePath, { flags: 'wx' });

    const request = get(dataSets[dataSetType], response => {
        if (response.statusCode === 200) {
            const len = parseInt(response.headers['content-length'], 10);
            let downloaded = 0;

            response.on('data', chunk => {
                downloaded += chunk.length;
                process.stdout.write('Downloading ' + (100.0 * downloaded / len).toFixed(2) + '%\r');
            });

            if (originalExt === '.gz') {
                response.pipe(createUnzip()).pipe(file);
            } else {
                response.pipe(file);
            }
        } else {
            file.close();
            unlink(filePath, () => { }); // Delete temp file
            console.log(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            process.exit(1);
        }
    });

    request.on('error', err => {
        file.close();
        unlink(filePath, () => { }); // Delete temp file
        console.log(err.message);
        process.exit(1);
    });

    file.on('finish', () => {
        process.exit(0); // Success
    });

    file.on('error', err => {
        file.close();

        if (err.name === 'EEXIST') {
            console.log('File already exists');
            process.exit(1);
        } else {
            unlink(filePath, () => { }); // Delete temp file
            console.log(err.message);
            process.exit(1);
        }
    });

};

downloadDataSet(dataSetName);

// Exit message
process.on('exit', function (code) {
    if (code === 0) {
        console.log('\nSuccess!');
    } else {
        console.log(`\nProcess exited with code ${code}.`);
    }

    return;
});
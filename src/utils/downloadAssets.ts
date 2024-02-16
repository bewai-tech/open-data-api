import { WriteStream, createWriteStream, unlink, unlinkSync } from 'fs';
import { get } from 'https';
import { extname, join } from 'path';
import { createUnzip } from 'zlib';
import { exec } from 'child_process';

import config from '../config/config';

/**
 * Remote open data sources are configured into the .env file at the root of the project
 * Make sure to expose new variables for new sources in the `config.ts` file located in the `src/config` folder
 */
const dataSets = {
    sirene_unitelegale: config.opendataRemoteSources.sirene_unitelegale,
    sirene_etablissement: config.opendataRemoteSources.sirene_etablissement,
    departementsfr: config.opendataRemoteSources.departementsfr,
    ban: config.opendataRemoteSources.ban
};

// Get the arguments
const dataSetName = process.argv[2]; // dataset name

const downloadDataSet = async (dataSetType = '', dest = join(process.cwd(), '/assets')) => {

    if (!dataSetName) {
        console.log(`Please provide as argument the dataset name you want to download (${Object.keys(dataSets).join(' / ')})`);
        process.exit(1);
    }

    // In case of no matching dataset found
    if (!Object.keys(dataSets).includes(dataSetType)) {
        console.log(`No dataset with key "${dataSetType}" exists. Please check available datasets in the docs.`);
        process.exit(1);
    }

    console.log(`Downloading ${dataSetType} data from remote source...`);

    const originalExt = extname(dataSets[dataSetType]);
    const filePath = join(dest, `${dataSetType}.csv`);

    // Delete existing file based on the filename contained in the URL
    try {
        unlinkSync(filePath);
        console.log('Existing file deleted...');
    } catch (error) {
        //
    }

    let file: WriteStream;

    // Only use a stream for other extensions since `.zip` logic is different
    if (originalExt !== '.zip') {
        file = createWriteStream(filePath, { flags: 'wx' });

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
    }

    const request = get(dataSets[dataSetType], response => {
        if (response.statusCode === 200) {

            if (originalExt === '.gz') {
                console.log('Handling gzip file');
                response.pipe(createUnzip()).pipe(file);
            } else if (originalExt === '.zip') {
                console.log('Downloading zip file');
                const tempZipPath = join(dest, `${dataSetType}.zip`);
                const tempFile = createWriteStream(tempZipPath);

                response.pipe(tempFile);

                response.on('end', () => {
                    console.log('Download complete, extracting CSV');
                    try {
                        // Use machine ressources to extract, since Node can't unzip large .zip files correctly
                        exec(`unzip -o "${tempZipPath}" -d "${dest}"`, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`Extraction error: ${error}`);
                                return;
                            }
                            console.log('Extraction complete');
                            unlinkSync(tempZipPath); // Optionally delete the zip file after extraction
                        });
                    } catch (err) {
                        console.error('Error during ZIP extraction:', err);
                    }
                });
            } else {
                console.log('Handling uncompressed file');
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
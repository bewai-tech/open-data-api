import path from 'path';
import { from as copyFrom } from 'pg-copy-streams';
import { createReadStream, statSync } from 'fs';
import { pipeline } from 'stream/promises';
import progress_stream from 'progress-stream';
import { Presets, SingleBar } from 'cli-progress';

import { Pg } from '../helpers';

// Get the arguments
const dataSetName = process.argv[2]; // dataset name

// List of available datasets
const dataSets = {
    sirene: {
        path: 'assets/sirene.csv',
        delimiter: ';'
    },
    departementsfr: {
        path: 'assets/departementsfr.csv',
        delimiter: ','
    }
};

const progressBar = new SingleBar({}, Presets.shades_classic);

const importDatabase = async (dataSetType: string) => {

    // In case of no matching dataset found
    if (!dataSetType) {
        console.log(`
            Please provide as argument the dataset name you want to download ${Object.keys(dataSets).join(' / ')})
        `);
    }

    if (!Object.keys(dataSets).includes(dataSetType)) {
        throw Error(`No dataset with key "${dataSetType}" exists. Please check available datasets in the docs.`);
    }

    // Get the path to the dataset relative to the environment
    const relativePath = path.join(process.cwd(), dataSets[dataSetType].path);

    const pool = Pg.getPool();
    const client = await pool.connect();
    try {
        // Init logging functions
        const stat = statSync(relativePath);
        const str = progress_stream({
            length: stat.size,
            time: 100 /* ms */
        });

        // Init the progress bar to 100% max
        progressBar.start(100, 0);

        str.on('progress', (progress) => {
            // Update progress bar
            progressBar.update(progress.percentage);
        });

        // Duplicate existing table schema to a temp one
        const tmpTable = `tmp_${dataSetType}`;

        // Drop tmp table if exists
        await client.query(`DROP TABLE IF EXISTS ${tmpTable}`);
        await client.query(`CREATE TABLE ${tmpTable} (LIKE ${dataSetType} INCLUDING ALL)`);

        // Copy data in this temp table
        const ingestStream = client.query(copyFrom(`
        COPY ${tmpTable} FROM STDIN
        WITH CSV HEADER DELIMITER '${dataSets[dataSetType].delimiter}' QUOTE '"' ESCAPE '\\' NULL AS ''
        `));

        const sourceStream = createReadStream(relativePath);
        await pipeline(sourceStream, str, ingestStream);

        // Once COPY is finished, delete the old table
        await client.query(`DROP TABLE ${dataSetType}`);

        // Change the name of the temp table
        await client.query(`ALTER TABLE ${tmpTable} RENAME TO ${dataSetType}`);

    } catch (error) {
        console.log(error);
        process.exit(1); // Error
    }
    finally {
        client.release();
        progressBar.stop();
    }
    await pool.end();

    process.exit(0); // Success
};

importDatabase(dataSetName);

// Exit message
process.on('exit', function (code) {
    if (code === 0) {
        console.log('\nSuccess!');
    } else {
        console.log(`\nProcess exited with code ${code}.`);
    }

    return;
});
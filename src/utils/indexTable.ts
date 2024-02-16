import { Pg } from '../helpers';

// Get the arguments
const dataSetName = process.argv[2]; // dataset name

const indexCommands = {
    sirene: `
    CREATE INDEX IF NOT EXISTS idx_sirene_unitelegale_siren ON sirene_unitelegale(siren);
    CREATE INDEX IF NOT EXISTS idx_sirene_etablissement_siren ON sirene_etablissement(siren);
    CREATE INDEX IF NOT EXISTS idx_sirene_etablissement_siret ON sirene_etablissement(siret);
    `,
    ban: `
    DROP INDEX IF EXISTS idx_ban_nom_voie, idx_ban_nom_commune;
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE INDEX IF NOT EXISTS idx_ban_id ON ban(id);
    CREATE INDEX IF NOT EXISTS idx_ban_id_fantoir ON ban(id_fantoir);
    CREATE INDEX IF NOT EXISTS idx_ban_code_insee ON ban(code_insee);
    CREATE INDEX IF NOT EXISTS idx_ban_numero ON ban(numero);
    CREATE INDEX IF NOT EXISTS idx_ban_code_postal ON ban(code_postal);
    CREATE INDEX IF NOT EXISTS trgm_idx_ban_nom_voie ON ban USING gin (nom_voie gin_trgm_ops);
    CREATE INDEX IF NOT EXISTS trgm_idx_ban_nom_commune ON ban USING gin (nom_commune gin_trgm_ops);
    `,
    departementsfr: `
    CREATE INDEX IF NOT EXISTS idx_departementsfr_code_departement ON departementsfr(code_departement);
    CREATE INDEX IF NOT EXISTS idx_departementsfr_code_region ON departementsfr(code_region);
    `
};

export const indexTable = async (dataSetType: string) => {

    // In case of no matching dataset found
    if (!dataSetType) {
        console.log(`
        Please provide as argument the dataset name you want to create index on: ${Object.keys(indexCommands).join(' / ')})
    `);
    }

    if (!Object.keys(indexCommands).includes(dataSetType)) {
        throw Error(`No dataset with key "${dataSetType}" exists. Please check available datasets in the docs.`);
    }

    const pool = Pg.getPool();
    const client = await pool.connect();

    try {
        await client.query(indexCommands[dataSetType]);
    } catch (error) {
        console.log(error);
        process.exit(1); // Error
    } finally {
        client.release();
    }

    process.exit(0);
};

indexTable(dataSetName);

// Exit message
process.on('exit', function (code) {
    if (code === 0) {
        console.log('\nSuccess!');
    } else {
        console.log(`\nProcess exited with code ${code}.`);
    }

    return;
});
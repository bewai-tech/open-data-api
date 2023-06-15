import { Pg } from '../helpers';

export const initDepartementsFranceTable = () => {

    const createTable = `
    CREATE TABLE IF NOT EXISTS "departementsfr" (
        "code_departement" CHARACTER VARYING,
        "departement" CHARACTER VARYING,
        "code_region" CHARACTER VARYING,
        "region" CHARACTER VARYING
    );`;

    const createIndexes = `
    CREATE INDEX IF NOT EXISTS idx_departementsfr_code_departement ON departementsfr(code_departement);
    CREATE INDEX IF NOT EXISTS idx_departementsfr_code_region ON departementsfr(code_region);
    `;

    return Pg.execute(createTable).then(async (res) => {
        if (res) {
            console.log('departementsfr table initialized ✓');
        } else {
            console.log('departementsfr table already exist (nothing done)');
        }
        await Pg.execute(createIndexes);

        return res;
    });
};

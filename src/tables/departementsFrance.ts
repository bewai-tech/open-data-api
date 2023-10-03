import { Pg } from '../helpers';

export const initDepartementsFranceTable = () => {

    const createTable = `
    CREATE TABLE IF NOT EXISTS "departementsfr" (
        "code_departement" CHARACTER VARYING,
        "departement" CHARACTER VARYING,
        "code_region" CHARACTER VARYING,
        "region" CHARACTER VARYING
    );`;

    return Pg.execute(createTable).then(async (res) => {
        if (res) {
            console.log('departementsfr table initialized ✓');
        } else {
            console.log('departementsfr table already exist (nothing done)');
        }

        return res;
    });
};

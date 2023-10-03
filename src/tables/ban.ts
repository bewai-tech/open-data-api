import { Pg } from '../helpers';

export const initBaseAdresseNationale = () => {

    const createTable = `
    CREATE TABLE IF NOT EXISTS "ban" (
        "id" CHARACTER VARYING,
        "id_fantoir" CHARACTER VARYING,
        "numero" CHARACTER VARYING,
        "rep" CHARACTER VARYING,
        "nom_voie" CHARACTER VARYING,
        "code_postal" CHARACTER VARYING,
        "code_insee" CHARACTER VARYING,
        "nom_commune" CHARACTER VARYING,
        "code_insee_ancienne_commune" CHARACTER VARYING,
        "nom_ancienne_commune" CHARACTER VARYING,
        "x" CHARACTER VARYING,
        "y" CHARACTER VARYING,
        "lon" CHARACTER VARYING,
        "lat" CHARACTER VARYING,
        "type_position" CHARACTER VARYING,
        "alias" CHARACTER VARYING,
        "nom_ld" CHARACTER VARYING,
        "libelle_acheminement" CHARACTER VARYING,
        "nom_afnor" CHARACTER VARYING,
        "source_position" CHARACTER VARYING,
        "source_nom_voie" CHARACTER VARYING,
        "certification_commune" CHARACTER VARYING,
        "cad_parcelles" CHARACTER VARYING
    );`;

    return Pg.execute(createTable).then(async (res) => {
        if (res) {
            console.log('ban table initialized ✓');
        } else {
            console.log('ban table already exist (nothing done)');
        }

        return res;
    });
};

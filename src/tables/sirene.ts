import { Pg } from '../helpers';

export const initSireneTable = () => {

    const createTableUniteLegale = `
    CREATE TABLE IF NOT EXISTS "sirene_unitelegale" (
        "siren" CHARACTER VARYING,
        "statutDiffusionUniteLegale" CHARACTER VARYING,
        "unitePurgeeUniteLegale" CHARACTER VARYING,
        "dateCreationUniteLegale" CHARACTER VARYING,
        "sigleUniteLegale" CHARACTER VARYING,
        "sexeUniteLegale" CHARACTER VARYING,
        "prenom1UniteLegale" CHARACTER VARYING,
        "prenom2UniteLegale" CHARACTER VARYING,
        "prenom3UniteLegale" CHARACTER VARYING,
        "prenom4UniteLegale" CHARACTER VARYING,
        "prenomUsuelUniteLegale" CHARACTER VARYING,
        "pseudonymeUniteLegale" CHARACTER VARYING,
        "identifiantAssociationUniteLegale" CHARACTER VARYING,
        "trancheEffectifsUniteLegale" CHARACTER VARYING,
        "anneeEffectifsUniteLegale" CHARACTER VARYING,
        "dateDernierTraitementUniteLegale" CHARACTER VARYING,
        "nombrePeriodesUniteLegale" CHARACTER VARYING,
        "categorieEntreprise" CHARACTER VARYING,
        "anneeCategorieEntreprise" CHARACTER VARYING,
        "dateDebut" CHARACTER VARYING,
        "etatAdministratifUniteLegale" CHARACTER VARYING,
        "nomUniteLegale" CHARACTER VARYING,
        "nomUsageUniteLegale" CHARACTER VARYING,
        "denominationUniteLegale" CHARACTER VARYING,
        "denominationUsuelle1UniteLegale" CHARACTER VARYING,
        "denominationUsuelle2UniteLegale" CHARACTER VARYING,
        "denominationUsuelle3UniteLegale" CHARACTER VARYING,
        "categorieJuridiqueUniteLegale" CHARACTER VARYING,
        "activitePrincipaleUniteLegale" CHARACTER VARYING,
        "nomenclatureActivitePrincipaleUniteLegale" CHARACTER VARYING,
        "nicSiegeUniteLegale" CHARACTER VARYING,
        "economieSocialeSolidaireUniteLegale" CHARACTER VARYING,
        "societeMissionUniteLegale" CHARACTER VARYING,
        "caractereEmployeurUniteLegale" CHARACTER VARYING
    );`;

    const createTableEtablissement = `
    CREATE TABLE IF NOT EXISTS "sirene_etablissement" (
        "siren" CHARACTER VARYING,
        "nic" CHARACTER VARYING,
        "siret" CHARACTER VARYING,
        "statutDiffusionEtablissement" CHARACTER VARYING,
        "dateCreationEtablissement" CHARACTER VARYING,
        "trancheEffectifsEtablissement" CHARACTER VARYING,
        "anneeEffectifsEtablissement" CHARACTER VARYING,
        "activitePrincipaleRegistreMetiersEtablissement" CHARACTER VARYING,
        "dateDernierTraitementEtablissement" CHARACTER VARYING,
        "etablissementSiege" CHARACTER VARYING,
        "nombrePeriodesEtablissement" CHARACTER VARYING,
        "complementAdresseEtablissement" CHARACTER VARYING,
        "numeroVoieEtablissement" CHARACTER VARYING,
        "indiceRepetitionEtablissement" CHARACTER VARYING,
        "typeVoieEtablissement" CHARACTER VARYING,
        "libelleVoieEtablissement" CHARACTER VARYING,
        "codePostalEtablissement" CHARACTER VARYING,
        "libelleCommuneEtablissement" CHARACTER VARYING,
        "libelleCommuneEtrangerEtablissement" CHARACTER VARYING,
        "distributionSpecialeEtablissement" CHARACTER VARYING,
        "codeCommuneEtablissement" CHARACTER VARYING,
        "codeCedexEtablissement" CHARACTER VARYING,
        "libelleCedexEtablissement" CHARACTER VARYING,
        "codePaysEtrangerEtablissement" CHARACTER VARYING,
        "libellePaysEtrangerEtablissement" CHARACTER VARYING,
        "complementAdresse2Etablissement" CHARACTER VARYING,
        "numeroVoie2Etablissement" CHARACTER VARYING,
        "indiceRepetition2Etablissement" CHARACTER VARYING,
        "typeVoie2Etablissement" CHARACTER VARYING,
        "libelleVoie2Etablissement" CHARACTER VARYING,
        "codePostal2Etablissement" CHARACTER VARYING,
        "libelleCommune2Etablissement" CHARACTER VARYING,
        "libelleCommuneEtranger2Etablissement" CHARACTER VARYING,
        "distributionSpeciale2Etablissement" CHARACTER VARYING,
        "codeCommune2Etablissement" CHARACTER VARYING,
        "codeCedex2Etablissement" CHARACTER VARYING,
        "libelleCedex2Etablissement" CHARACTER VARYING,
        "codePaysEtranger2Etablissement" CHARACTER VARYING,
        "libellePaysEtranger2Etablissement" CHARACTER VARYING,
        "dateDebut" CHARACTER VARYING,
        "etatAdministratifEtablissement" CHARACTER VARYING,
        "enseigne1Etablissement" CHARACTER VARYING,
        "enseigne2Etablissement" CHARACTER VARYING,
        "enseigne3Etablissement" CHARACTER VARYING,
        "denominationUsuelleEtablissement" CHARACTER VARYING,
        "activitePrincipaleEtablissement" CHARACTER VARYING,
        "nomenclatureActivitePrincipaleEtablissement" CHARACTER VARYING,
        "caractereEmployeurEtablissement" CHARACTER VARYING
    );`;

    return Promise.all([Pg.execute(createTableUniteLegale), Pg.execute(createTableEtablissement)]).then((values) => {
        const res = values.every(val => val);

        if (res) {
            console.log('sirene tables initialized ✓');
        } else {
            console.log('sirene tables already exist (nothing done)');
        }

        return res;
    });
};

import { Pg } from '../helpers';

export const initSireneTable = () => {

    const createTable = `
    CREATE TABLE IF NOT EXISTS "sirene" (
        "siren" CHARACTER VARYING,
        "nic" CHARACTER VARYING,
        "siret" CHARACTER VARYING,
        "statutdiffusionetablissement" CHARACTER VARYING,
        "datecreationetablissement" CHARACTER VARYING,
        "trancheeffectifsetablissement" CHARACTER VARYING,
        "trancheeffectifsetablissementtriable" CHARACTER VARYING,
        "anneeeffectifsetablissement" CHARACTER VARYING,
        "activiteprincipaleregistremetiersetablissement" CHARACTER VARYING,
        "datederniertraitementetablissement" CHARACTER VARYING,
        "etablissementsiege" CHARACTER VARYING,
        "nombreperiodesetablissement" CHARACTER VARYING,
        "complementadresseetablissement" CHARACTER VARYING,
        "numerovoieetablissement" CHARACTER VARYING,
        "indicerepetitionetablissement" CHARACTER VARYING,
        "typevoieetablissement" CHARACTER VARYING,
        "libellevoieetablissement" CHARACTER VARYING,
        "codepostaletablissement" CHARACTER VARYING,
        "libellecommuneetablissement" CHARACTER VARYING,
        "libellecommuneetrangeretablissement" CHARACTER VARYING,
        "distributionspecialeetablissement" CHARACTER VARYING,
        "codecommuneetablissement" CHARACTER VARYING,
        "codecedexetablissement" CHARACTER VARYING,
        "libellecedexetablissement" CHARACTER VARYING,
        "codepaysetrangeretablissement" CHARACTER VARYING,
        "libellepaysetrangeretablissement" CHARACTER VARYING,
        "complementadresse2etablissement" CHARACTER VARYING,
        "numerovoie2etablissement" CHARACTER VARYING,
        "indicerepetition2etablissement" CHARACTER VARYING,
        "typevoie2etablissement" CHARACTER VARYING,
        "libellevoie2etablissement" CHARACTER VARYING,
        "codepostal2etablissement" CHARACTER VARYING,
        "libellecommune2etablissement" CHARACTER VARYING,
        "libellecommuneetranger2etablissement" CHARACTER VARYING,
        "distributionspeciale2etablissement" CHARACTER VARYING,
        "codecommune2etablissement" CHARACTER VARYING,
        "codecedex2etablissement" CHARACTER VARYING,
        "libellecedex2etablissement" CHARACTER VARYING,
        "codepaysetranger2etablissement" CHARACTER VARYING,
        "libellepaysetranger2etablissement" CHARACTER VARYING,
        "datedebutetablissement" CHARACTER VARYING,
        "etatadministratifetablissement" CHARACTER VARYING,
        "enseigne1etablissement" CHARACTER VARYING,
        "enseigne2etablissement" CHARACTER VARYING,
        "enseigne3etablissement" CHARACTER VARYING,
        "denominationusuelleetablissement" CHARACTER VARYING,
        "activiteprincipaleetablissement" CHARACTER VARYING,
        "nomenclatureactiviteprincipaleetablissement" CHARACTER VARYING,
        "caractereemployeuretablissement" CHARACTER VARYING,
        "statutdiffusionunitelegale" CHARACTER VARYING,
        "unitepurgeeunitelegale" CHARACTER VARYING,
        "datecreationunitelegale" CHARACTER VARYING,
        "sigleunitelegale" CHARACTER VARYING,
        "sexeunitelegale" CHARACTER VARYING,
        "prenom1unitelegale" CHARACTER VARYING,
        "prenom2unitelegale" CHARACTER VARYING,
        "prenom3unitelegale" CHARACTER VARYING,
        "prenom4unitelegale" CHARACTER VARYING,
        "prenomusuelunitelegale" CHARACTER VARYING,
        "pseudonymeunitelegale" CHARACTER VARYING,
        "identifiantassociationunitelegale" CHARACTER VARYING,
        "trancheeffectifsunitelegale" CHARACTER VARYING,
        "trancheeffectifsunitelegaletriable" CHARACTER VARYING,
        "anneeeffectifsunitelegale" CHARACTER VARYING,
        "datederniertraitementunitelegale" CHARACTER VARYING,
        "nombreperiodesunitelegale" CHARACTER VARYING,
        "categorieentreprise" CHARACTER VARYING,
        "anneecategorieentreprise" CHARACTER VARYING,
        "datedebutunitelegale" CHARACTER VARYING,
        "etatadministratifunitelegale" CHARACTER VARYING,
        "nomunitelegale" CHARACTER VARYING,
        "nomusageunitelegale" CHARACTER VARYING,
        "denominationunitelegale" CHARACTER VARYING,
        "denominationusuelle1unitelegale" CHARACTER VARYING,
        "denominationusuelle2unitelegale" CHARACTER VARYING,
        "denominationusuelle3unitelegale" CHARACTER VARYING,
        "categoriejuridiqueunitelegale" CHARACTER VARYING,
        "activiteprincipaleunitelegale" CHARACTER VARYING,
        "nomenclatureactiviteprincipaleunitelegale" CHARACTER VARYING,
        "nicsiegeunitelegale" CHARACTER VARYING,
        "economiesocialesolidaireunitelegale" CHARACTER VARYING,
        "societemissionunitelegale" CHARACTER VARYING,
        "caractereemployeurunitelegale" CHARACTER VARYING,
        "codeepcietablissement" CHARACTER VARYING,
        "epcietablissement" CHARACTER VARYING,
        "codearrondissementetablissement" CHARACTER VARYING,
        "codedepartementetablissement" CHARACTER VARYING,
        "departementetablissement" CHARACTER VARYING,
        "coderegionetablissement" CHARACTER VARYING,
        "regionetablissement" CHARACTER VARYING,
        "sectionetablissement" CHARACTER VARYING,
        "soussectionetablissement" CHARACTER VARYING,
        "divisionetablissement" CHARACTER VARYING,
        "groupeetablissement" CHARACTER VARYING,
        "classeetablissement" CHARACTER VARYING,
        "sectionunitelegale" CHARACTER VARYING,
        "soussectionunitelegale" CHARACTER VARYING,
        "divisionunitelegale" CHARACTER VARYING,
        "groupeunitelegale" CHARACTER VARYING,
        "classeunitelegale" CHARACTER VARYING,
        "naturejuridiqueunitelegale" CHARACTER VARYING,
        "l1_adressage_unitelegale" CHARACTER VARYING,
        "adresseetablissement" CHARACTER VARYING,
        "siretsiegeunitelegale" CHARACTER VARYING,
        "datefermetureetablissement" CHARACTER VARYING,
        "datefermetureunitelegale" CHARACTER VARYING,
        "geolocetablissement" CHARACTER VARYING
    );`;

    return Pg.execute(createTable).then(async (res) => {
        if (res) {
            console.log('sirene table initialized ✓');
        } else {
            console.log('sirene table already exist (nothing done)');
        }

        return res;
    });
};

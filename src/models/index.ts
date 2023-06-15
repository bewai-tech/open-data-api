export interface EtabData {
    siren: string;
    nic: string;
    siret: string;
    dateFin: string;
    dateDebut: string;
    etatAdministratifEtablissement: string;
    changementEtatAdministratifEtablissement: string;
    enseigne1Etablissement: string;
    enseigne2Etablissement: string;
    enseigne3Etablissement: string;
    changementEnseigneEtablissement: string;
    denominationUsuelleEtablissement: string;
    changementDenominationUsuelleEtablissement: string;
    activitePrincipaleEtablissement: string;
    nomenclatureActivitePrincipaleEtablissement: string;
    changementActivitePrincipaleEtablissement: string;
    caractereEmployeurEtablissement: string;
    changementCaractereEmployeurEtablissement: string;
}

export interface PgConnectionObj {
        host: string;
        port: string;
        database: string;
        user: string;
        password: string;
}
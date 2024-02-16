/* eslint-disable @typescript-eslint/no-var-requires */
const packageData = require('../../package.json');

import * as dotenv from 'dotenv';

dotenv.config();

export default {
    nodeEnv: process.env.NODE_ENV,
    appEnv: process.env.APP_ENV,
    sentryDsn: process.env.SENTRY_DSN,
    sentryNormalizeDepth: 10,
    appVersion: packageData.version,
    commitSha: process.env.COMMIT_SHA,
    pgPromise: {},
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: +process.env.DB_PORT
    },
    opendataRemoteSources: {
        sirene_unitelegale: process.env.SIRENE_UNITE_LEGALE,
        sirene_etablissement: process.env.SIRENE_ETABLISSEMENT,
        departementsfr: process.env.DEPARTEMENTS_FR,
        ban: process.env.BAN
    }
};

import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import routes from './routes';
import config from './config/config';

const init = () => {

    // Create a new express application instance
    // create and setup express app
    const app = express();

    // Express configuration
    app.use(express.json({ limit: '2mb' }));
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(compression());

    // Call midlewares
    app.use(cors({
        origin: true,
        maxAge: 3600
    }));
    app.use(helmet());

    // Set all routes from routes folder
    app.use('/', routes);

    // Init Sentry error reporting
    Sentry.init({
        dsn: config.sentryDsn,
        release: config.appVersion,
        environment: config.appEnv,
        enabled: !!config.sentryDsn,
        normalizeDepth: config.sentryNormalizeDepth,
        attachStacktrace: true,
        integrations: [
            new Tracing.Integrations.Express({ app })
        ],
        tracesSampleRate: 1.0
    });

    app.use(Sentry.Handlers.tracingHandler());

    const appPort = 3000;
    app.listen(appPort, async () => {
        console.log(`Server started on port ${appPort}!`);
    });
};

// Start the server
init();

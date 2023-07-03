import { Router } from 'express';

import sirene from './sirene.route';
import departementsFr from './departementsFr.route';
import ban from './ban.route';

const routes = Router();

routes.use('/sirene', sirene);
routes.use('/departementsfr', departementsFr);
routes.use('/ban', ban);

export default routes;
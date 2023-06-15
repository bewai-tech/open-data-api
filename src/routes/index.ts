import { Router } from 'express';

import sirene from './sirene.route';
import departementsFr from './departementsFr.route';

const routes = Router();

routes.use('/sirene', sirene);
routes.use('/departementsfr', departementsFr);

export default routes;
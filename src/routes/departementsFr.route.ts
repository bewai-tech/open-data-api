import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import DepartementsFrController from '../controllers/departementsFr.controller';

const router = Router({ mergeParams: true });

router.get(
    '/',
    asyncHandler(DepartementsFrController.getDepartements)
);

export default router;
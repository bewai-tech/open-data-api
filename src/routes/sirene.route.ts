import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import SirenController from '../controllers/siren.controller';

const router = Router({ mergeParams: true });

router.get(
    '/',
    asyncHandler(SirenController.checkSirene)
);

router.get(
    '/count',
    asyncHandler(SirenController.count)
);

export default router;
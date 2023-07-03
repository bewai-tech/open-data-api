import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import BanController from '../controllers/ban.controller';

const router = Router({ mergeParams: true });

router.get(
    '/',
    asyncHandler(BanController.getAddress)
);

router.get(
    '/count',
    asyncHandler(BanController.count)
);

export default router;
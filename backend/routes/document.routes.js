import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { create, list } from '../controllers/document.controller.js';
const router = Router();
router.get('/', requireAuth, list);
router.post('/', requireAuth, create);
export default router;

import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { list, create, update, remove } from '../controllers/template.controller.js';
const router = Router();
router.get('/', requireAuth, list);
router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);
export default router;

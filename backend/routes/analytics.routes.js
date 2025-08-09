import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.js'
import { addEvent, statsByTemplate, timeseriesByTemplate } from '../controllers/analytics.controller.js'

const router = Router()

router.post('/event', requireAuth, addEvent)                  // registrar evento libre (p.ej. export PDF)
router.get('/templates', requireAuth, statsByTemplate)        // ranking por plantilla
router.get('/templates/:id/timeseries', requireAuth, timeseriesByTemplate)

export default router

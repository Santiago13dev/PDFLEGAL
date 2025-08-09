// backend/routes/normas.routes.js
import { Router } from 'express'
import Norma from '../models/Norma.js'
const r = Router()

r.get('/search', async (req, res) => {
  const { q = '', tipo, entidad, estado, anioDesde, anioHasta, page=1, limit=20, sort='relevancia' } = req.query
  const filter = {}
  if (tipo) filter.tipo = tipo
  if (entidad) filter.entidad = entidad
  if (estado) filter.estado = estado
  if (anioDesde || anioHasta) filter.anio = { ...(anioDesde && { $gte: +anioDesde }), ...(anioHasta && { $lte: +anioHasta }) }

  const query = q ? { $text: { $search: q } } : {}
  const cursor = Norma.find({ ...filter, ...query })
  if (sort === 'reciente') cursor.sort({ fechaPublicacion: -1 })
  if (q && sort === 'relevancia') cursor.sort({ score: { $meta: 'textScore' } }).select({ score: { $meta: 'textScore' } })

  const docs = await cursor.skip((page-1)*limit).limit(+limit)
  const total = await Norma.countDocuments({ ...filter, ...query })
  res.json({ ok: true, total, page:+page, limit:+limit, items: docs })
})

export default r

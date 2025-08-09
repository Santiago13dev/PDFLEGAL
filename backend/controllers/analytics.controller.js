import mongoose from 'mongoose'
import AuditLog from '../models/AuditLog.js'
import Template from '../models/Template.js'

export async function addEvent(req, res) {
  const { templateId = null, documentId = null, event, meta = {} } = req.body || {}
  if (!event) return res.status(400).json({ ok: false, message: 'event requerido' })
  await AuditLog.create({
    userId: req.user?.id || null,
    templateId: templateId ? new mongoose.Types.ObjectId(templateId) : null,
    documentId: documentId ? new mongoose.Types.ObjectId(documentId) : null,
    event,
    meta
  })
  res.json({ ok: true })
}

export async function statsByTemplate(req, res) {
  const { start, end } = req.query
  const match = { event: 'DOCUMENT_CREATE' }
  if (start || end) {
    match.createdAt = {}
    if (start) match.createdAt.$gte = new Date(start)
    if (end) match.createdAt.$lte = new Date(end)
  }

  const pipeline = [
    { $match: match },
    { $group: { _id: '$templateId', count: { $sum: 1 }, lastAt: { $max: '$createdAt' } } },
    {
      $lookup: {
        from: 'templates',
        localField: '_id',
        foreignField: '_id',
        as: 'tpl'
      }
    },
    {
      $project: {
        _id: 0,
        templateId: '$_id',
        title: { $first: '$tpl.title' },
        description: { $first: '$tpl.description' },
        count: 1,
        lastAt: 1
      }
    },
    { $sort: { count: -1 } }
  ]

  const items = await AuditLog.aggregate(pipeline)
  res.json({ ok: true, items })
}

export async function timeseriesByTemplate(req, res) {
  const { id } = req.params
  const { start, end } = req.query
  const match = {
    event: 'DOCUMENT_CREATE',
    templateId: new mongoose.Types.ObjectId(id)
  }
  if (start || end) {
    match.createdAt = {}
    if (start) match.createdAt.$gte = new Date(start)
    if (end) match.createdAt.$lte = new Date(end)
  }

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: {
          y: { $year: '$createdAt' },
          m: { $month: '$createdAt' },
          d: { $dayOfMonth: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.y': 1, '_id.m': 1, '_id.d': 1 } },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: '$_id.y',
            month: '$_id.m',
            day: '$_id.d'
          }
        },
        count: 1
      }
    }
  ]

  const points = await AuditLog.aggregate(pipeline)
  res.json({ ok: true, points })
}

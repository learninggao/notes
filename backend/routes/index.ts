import express, { Request, Response } from 'express'
import { db } from '../db'

const router = express.Router()

/* topics */

router.get('/api/topic', async (req: Request, res: Response) => {
  const topics = await db.topics.getAll()
  res.send(topics)
})

router.get('/api/topic/:topicId/note', async (req: Request, res: Response) => {
  const notes = await db.notes.getByTopic(parseInt(req.params.topicId, 10))
  res.send(notes)
})

/* notes */

router.get('/api/note', async (req: Request, res: Response) => {
  const notes = await db.notes.getAll()
  res.send(notes)
})

/* tags */

router.get('/api/tag', async (req: Request, res: Response) => {
  const tags = await db.tags.getTags()
  res.send(tags)
})

export { router as IndexRouter }

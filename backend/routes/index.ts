import express, { Request, Response } from 'express'
import { db } from '../db'

const router = express.Router()

/* topics */

router.get('/api/topic', async (req: Request, res: Response) => {
  const topics = await db.topics.getAll()
  res.send(topics)
})

/* notes */

router.get('/api/note', async (req: Request, res: Response) => {
  const notes = await db.notes.getAll()
  res.send(notes)
})

export { router as IndexRouter }

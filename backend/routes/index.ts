import express, { Request, Response } from 'express'
import { db } from '../db'

const router = express.Router()

/* topics */

router.get('/api/topics', async (req: Request, res: Response) => {
  const topics = await db.topics.getAll()
  res.send(topics)
})

/* notes */

router.get('/api/notes', async (req: Request, res: Response) => {
  const notes = await db.notes.getAll()
  res.send(notes)
})

export { router as IndexRouter }

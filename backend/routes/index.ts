import express, { Request, Response } from 'express'
import { db } from '../db'

const router = express.Router()

router.get('/api/topics', async (req: Request, res: Response) => {
  const topics = await db.topics.getAll()
  res.send(topics)
})

export { router as IndexRouter }

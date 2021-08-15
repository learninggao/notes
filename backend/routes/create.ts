import express, { Request, Response } from 'express'
import { db } from '../db'

const router = express.Router()

/* topics */

router.post('/api/topic', async (req: Request, res: Response) => {
  const topicName = req.body.topicName
  const topic = await db.topics.createTopic(topicName)
  res.send(topic)
})

export { router as CreateRouter }

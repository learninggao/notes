import express, { Request, Response } from 'express'
import { NotePayload } from '../../src/components/addNote/addNoteDialog'
import { db } from '../db'

const router = express.Router()

/* topics */

router.post('/api/topic', async (req: Request, res: Response) => {
  const topicName = req.body.topicName
  const topic = await db.topics.createTopic(topicName)
  res.send(topic)
})

/* notes */

router.post('/api/note', async (req: Request, res: Response) => {
  const noteBody: NotePayload = req.body.note
  const note = await db.notes.createNote(noteBody)
  res.send(note)
})

export { router as CreateRouter }

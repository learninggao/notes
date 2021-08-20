import { Router, Request, Response } from 'express'
import { db } from '../db'

const router = Router()

/* topic */

/* notes */
router.put('/api/note', async (req: Request, res: Response) => {
  const { operation } = req.body
  if (operation === 'ASSOCIATE_TAG') {
    const { noteId, tag } = req.body
    const note = await db.notes.addExistingTag({ noteId, tag })
    res.send(note)
    return
  }
  res.sendStatus(400)
})

/* tags */

export { router as UpdateRouter }

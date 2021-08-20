import { Request, Response, Router } from 'express'
import { db } from '../db'

const router = Router()

router.delete('/api/note', async (req: Request, res: Response) => {
  const { operation } = req.body
  if (operation === 'REMOVE_TAG') {
    const { noteId, tag } = req.body
    const note = await db.notes.removeExistingTag({ noteId, tag })
    res.send(note)
    return
  }

  res.sendStatus(400)
})

export { router as DeleteRouter }

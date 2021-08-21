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

/* tags */

router.delete('/api/tags/prune', async (req: Request, res: Response) => {
  try {
    await db.tags.pruneTags()
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

export { router as DeleteRouter }

import express, { Request, Response } from 'express'
import cors from 'cors'
import { IndexRouter } from './routes'
import { CreateRouter } from './routes/create'
import { UpdateRouter } from './routes/update'
import { DeleteRouter } from './routes/delete'

const app = express()

app.use(cors())

/* body parsers */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* routes */
app.use(IndexRouter)
app.use(CreateRouter)
app.use(UpdateRouter)
app.use(DeleteRouter)

if (process.env.NODE_ENV === 'production') {
  // public for serving assets
  app.use(express.static('.'))
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html')
  })
}

export { app }

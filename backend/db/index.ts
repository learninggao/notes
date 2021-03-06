import pgPromise, { IMain, IInitOptions } from 'pg-promise'
import {
  IExtensions,
  NotesRepository,
  TagRepository,
  TopicsRepository,
} from './repos'

type ExtendedProtocol = pgPromise.IDatabase<IExtensions> & IExtensions

const initOptions: IInitOptions<IExtensions> = {
  extend(obj: ExtendedProtocol) {
    obj.notes = new NotesRepository(obj, pgp)
    obj.topics = new TopicsRepository(obj, pgp)
    obj.tags = new TagRepository(obj, pgp)
  },
}

const pgp: IMain = pgPromise(initOptions)

const db: ExtendedProtocol = pgp({
  // host: 'localhost',
  database: 'notes',
  host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
  password: 'gaoban',
  port: 5432,
  user: 'postgres',
})

export { db, pgp }

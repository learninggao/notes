import { NotesRepository } from './Notes'
import { TopicsRepository } from './Topics'

interface IExtensions {
  notes: NotesRepository
  topics: TopicsRepository
}

export { IExtensions, NotesRepository, TopicsRepository }

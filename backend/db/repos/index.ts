import { NotesRepository } from './Notes'
import { TagRepository } from './Tag'
import { TopicsRepository } from './Topics'

interface IExtensions {
  notes: NotesRepository
  topics: TopicsRepository
  tags: TagRepository
}

export { IExtensions, NotesRepository, TopicsRepository, TagRepository }

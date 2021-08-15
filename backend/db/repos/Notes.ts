import cloneDeep from 'clone-deep'
import { IDatabase, IMain } from 'pg-promise'
import { Note, NoteDb } from '../model'

function transformer(noteDb: NoteDb): Note {
  const tNote: Partial<NoteDb & Note> = cloneDeep(noteDb)
  tNote.defaultOrder = tNote.default_order
  tNote.customOrder = tNote.custom_order
  tNote.createdAt = tNote.created_at
  tNote.topicId = tNote.topic_id
  delete tNote.default_order
  delete tNote.custom_order
  delete tNote.created_at
  delete tNote.topic_id
  return tNote as Note
}

export class NotesRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getByTopic(id: number): Promise<Note[]> {
    return this.db.map(
      'SELECT * from note where topic_id = $1',
      [id],
      transformer
    )
  }

  async getById(id: number): Promise<NoteDb> {
    return this.db.one('SELECT * From note where id = $1', [id])
  }

  async getAll(): Promise<Note[]> {
    return this.db.map('SELECT * from note', [], transformer)
  }

  async updateOne(params: {
    id: number
    key: string
    value: unknown
  }): Promise<null> {
    return this.db.none(
      'Update note set ${key} = ${value} where id = ${id}',
      params
    )
  }
}

import cloneDeep from 'clone-deep'
import { IDatabase, IMain } from 'pg-promise'
import { NotePayload } from '../../../src/components/addNote/addNoteDialog'
import { Note, NoteDb } from '../model'
import { getInsertSql } from './utils'

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

  async createNote(params: NotePayload): Promise<Note> {
    const sql = getInsertSql('note', params)
    const note = await this.db.one(sql, params)
    return transformer(note)
  }

  async getById(id: number): Promise<NoteDb> {
    return this.db.one('SELECT * From note where id = $1', [id])
  }

  async getAll(): Promise<Note[]> {
    return this.db.map('SELECT * from note', [], transformer)
  }

  async addExistingTag({
    noteId,
    tag,
  }: {
    noteId: number
    tag: string
  }): Promise<Note> {
    const { id: tagId } = await this.db.one(
      'SELECT id from tag where tag_name = $1',
      [tag]
    )
    // TODO candidate for transaction
    await this.db.none(
      'INSERT into note_tag (note_id, tag_id) VALUES ($1, $2)',
      [noteId, tagId]
    )
    return this.db.one(
      'UPDATE note SET tags = array_append(tags, $1) where id = $2 returning *',
      [tag, noteId]
    )
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

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

interface TagParam {
  noteId: number
  tag: string
}

export class NotesRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getByTopic(id: number): Promise<Note[]> {
    return this.db.map(
      'SELECT * from note where topic_id = $1 ORDER BY default_order ASC',
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

  async addExistingTag({ noteId, tag }: TagParam): Promise<Note> {
    const { id: tagId } = await this.db.one(
      'SELECT id from tag where tag_name = $1',
      [tag]
    )

    return this.db
      .tx((t) => {
        const q1 = this.db.none(
          'INSERT into note_tag (note_id, tag_id) VALUES ($1, $2)',
          [noteId, tagId]
        )
        const q2 = this.db.one(
          'UPDATE note SET tags = array_append(tags, $1) where id = $2 returning *',
          [tag, noteId]
        )
        return t.batch([q1, q2])
      })
      .then((data) => {
        return transformer(data[1])
      })
  }

  async removeExistingTag({ noteId, tag }: TagParam): Promise<Note> {
    // const {id: tagId } = await this.db.tags
    const { id: tagId } = await this.db.one(
      'SELECT id from tag where tag_name = $1',
      [tag]
    )
    return this.db
      .tx((t) => {
        const q1 = t.one(
          'Update note SET tags = array_remove(tags, $1) where id = $2 returning *',
          [tag, noteId]
        )
        const q2 = t.none(
          'DELETE from note_tag where note_id = $1 and tag_id = $2',
          [noteId, tagId]
        )
        return t.batch([q1, q2])
      })
      .then((data) => {
        return transformer(data[0])
      })
  }

  async addNewTag({ noteId, tag }: TagParam): Promise<Note> {
    return this.db
      .task((t) => {
        return t
          .one(
            'INSERT into tag (tag_name) VALUES ($1) returning id',
            [tag],
            (item: { id: number }) => item.id
          )
          .then(async (id: number) => {
            await t.none(
              'INSERT into note_tag (note_id, tag_id) VALUES ($1, $2)',
              [noteId, id]
            )
            return t.one(
              'UPDATE note set tags = array_append(tags, $1) where id = $2 returning *',
              [tag, noteId]
            )
          })
      })
      .then((data) => transformer(data))
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

import { IDatabase, IMain } from 'pg-promise'
import { NoteDb } from '../model'

export class NotesRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getById(id: number): Promise<NoteDb> {
    return this.db.one('SELECT * From note where id = $1', [id])
  }

  async getAll(): Promise<NoteDb[]> {
    return this.db.many('SELECT * from note')
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

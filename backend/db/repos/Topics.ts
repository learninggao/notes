import { IDatabase, IMain } from 'pg-promise'
import { TopicDb } from '../model'

export class TopicsRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getById(id: number): Promise<TopicDb> {
    return this.db.one('SELECT * From topic where id = $1', [id])
  }

  async getAll(): Promise<TopicDb[]> {
    return this.db.many('SELECT * from topic')
  }

  async updateOne(params: {
    id: number
    key: string
    value: unknown
  }): Promise<null> {
    return this.db.none(
      'Update topic set ${key} = ${value} where id = ${id}',
      params
    )
  }
}

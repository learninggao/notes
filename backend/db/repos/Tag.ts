import { IDatabase, IMain } from 'pg-promise'

export class TagRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getTags(): Promise<string[]> {
    return this.db.map('SELECT tag_name from tag', [], (item) => item.tag_name)
  }
}

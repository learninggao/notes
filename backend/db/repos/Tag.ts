import { IDatabase, IMain } from 'pg-promise'

export class TagRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getTags(): Promise<string[]> {
    return this.db.map('SELECT tag_name from tag', [], (item) => item.tag_name)
  }

  async pruneTags(): Promise<null> {
    return this.db.none(
      'DELETE FROM tag where id in ' +
        '(SELECT id from (SELECT tag.id, count(note_tag.tag_id) from tag left outer join note_tag on (tag.id = note_tag.tag_id) group by tag.id) as foo where foo.count = 0)'
    )
  }
}

import { IDatabase, IMain } from 'pg-promise'
import cloneDeep from 'clone-deep'
import { TopicDb, Topic } from '../model'

function transformer(topicDb: TopicDb): Topic {
  const tTopic: Partial<Topic & TopicDb> = cloneDeep(topicDb)
  tTopic.topicName = tTopic.topic_name
  tTopic.isHidden = tTopic.is_hidden
  tTopic.defaultOrder = tTopic.default_order
  tTopic.customOrder = tTopic.custom_order
  tTopic.createdAt = tTopic.created_at
  delete tTopic.topic_name
  delete tTopic.is_hidden
  delete tTopic.default_order
  delete tTopic.custom_order
  delete tTopic.created_at
  return tTopic as Topic
}

export class TopicsRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async getById(id: number): Promise<TopicDb> {
    return this.db.one('SELECT * From topic where id = $1', [id])
  }

  async getAll(): Promise<Topic[]> {
    return this.db.map('SELECT * from topic', [], transformer)
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

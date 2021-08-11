export interface TopicDb {
  id: number
  topic_name: string
  is_hidden: boolean
  default_order: number
  custom_order: number
  created_at: string
}

export interface Topic {
  id: number
  topicName: string
  isHidden: boolean
  defaultOrder: number
  customOrder: number
  createdAt: string
}

export interface Note {
  id: number
  defaultOrder: number
  customOrder: number
  type: string
  description: string
  url: string
  level: string
  content: string
  createdAt: string
  title: string
  tags: string[]
  notes: string[]
  todos: string[]
  topicId: number
}

export type NoteDb = Omit<
  Note,
  'defaultOrder' | 'customOrder' | 'createdAt' | 'topicId'
> & {
  default_order: number
  custom_order: number
  created_at: string
  topic_id: number
}

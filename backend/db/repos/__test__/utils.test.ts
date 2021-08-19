import { getInsertSql } from '../utils'

describe('getInsertSql', () => {
  test('simple case', () => {
    const sql = getInsertSql('note', { a: 'hello', b: 1 })
    expect(sql).toBe('INSERT INTO note (a, b) VALUES (${a}, ${b}) returning *')
  })

  test('utilizing column keymap', () => {
    const sql = getInsertSql('note', { a: 'hello', topicId: 1 })
    expect(sql).toBe(
      'INSERT INTO note (a, topic_id) VALUES (${a}, ${topicId}) returning *'
    )
  })
})

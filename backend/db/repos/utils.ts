type TableName = 'note' | 'topic'
const keyMap: Record<TableName, any> = {
  note: {
    topicId: 'topic_id',
  },
  topic: {},
}

export const getInsertSql = (tableName: TableName, params: any) => {
  const keys = Object.keys(params)
  const tableKeys = keys.map((key) =>
    keyMap[tableName][key] ? keyMap[tableName][key] : key
  )
  let sql = `INSERT INTO ${tableName} (${tableKeys.join(', ')}) VALUES (`
  sql += keys.map((key) => '${' + key + '}').join(', ')
  sql += ') returning *'

  return sql
}

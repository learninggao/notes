import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Note, Topic } from '../../types'

export const API_URL = 'http://localhost:3001/api'
// export type ReqParamKey = 'page'
// export type ReqParams = Partial<Record<ReqParamKey, string>>

const TOPIC_API_URL = `${API_URL}/topic`

export const fetchTopics = createAsyncThunk('fetch_topics', async () => {
  const requestURL = TOPIC_API_URL
  const { data } = await axios.get<Topic[]>(`${requestURL}`)
  return data
})

export const fetchNotesForTopic = createAsyncThunk(
  'fetch_notes_for_topic',
  async (id: number) => {
    const requestURL = `${TOPIC_API_URL}/${id}/note`
    const { data } = await axios.get<Note[]>(`${requestURL}`)
    return data
  }
)

export const fetchCreateTopic = createAsyncThunk(
  'create_topic',
  async (topicName: string) => {
    const requestURL = TOPIC_API_URL
    const { data } = await axios.post<Topic>(requestURL, {
      topicName,
    })
    return data
  }
)

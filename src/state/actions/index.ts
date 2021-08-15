import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import qs from 'qs'
import { Note, Topic } from '../../../backend/db/model'

export const API_URL = 'http://localhost:3001/api'
export type ReqParamKey = 'page'
export type ReqParams = Partial<Record<ReqParamKey, string>>

/* topics */

export const fetchTopics = createAsyncThunk('fetch_topics', async () => {
  const requestURL = `${API_URL}/topic`
  const { data } = await axios.get<Topic[]>(`${requestURL}`)
  return data
})

export const fetchNotesForTopic = createAsyncThunk(
  'fetch_notes_for_topic',
  async (id: number) => {
    const requestURL = `${API_URL}/topic/${id}/note`
    const { data } = await axios.get<Note[]>(`${requestURL}`)
    return data
  }
)

/* notes */

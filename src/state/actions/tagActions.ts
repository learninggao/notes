import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const API_URL = 'http://localhost:3001/api'

const TAG_API_URL = `${API_URL}/tag`

export const fetchTags = createAsyncThunk('create_async_thunk', async () => {
  const requestURL = TAG_API_URL
  const { data } = await axios.get<string[]>(requestURL)
  return data
})

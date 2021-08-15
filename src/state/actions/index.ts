import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import qs from 'qs'
import { Topic } from '../../../backend/db/model'

export const API_URL = 'http://localhost:3001/api'
export type ReqParamKey = 'page'
export type ReqParams = Partial<Record<ReqParamKey, string>>
type ValueOf<T> = T[keyof T]

export const fetchPosts = createAsyncThunk(
  'fetch_plab_posts',
  async (params: ReqParams) => {
    const requestURL = `${API_URL}/posts`
    const { data } = await axios.get<Topic[]>(
      `${requestURL}?${qs.stringify(params)}`
    )
    return data
  }
)

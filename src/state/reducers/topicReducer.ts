import { createAction, createSlice } from '@reduxjs/toolkit'
import { Topic } from '../../../backend/db/model'
import { fetchTopics } from '../actions'

type APPState = {
  activeTopicId: number
  activeTopicIndex: number
  status: 'loading' | 'idle'
  error: string | null
  list: Topic[]
}

const initialState: APPState = {
  activeTopicId: -1,
  activeTopicIndex: -1,
  error: null,
  list: [] as Topic[],
  status: 'idle',
}

const topicReducer = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTopics.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.list = payload
        state.activeTopicId = payload[0].id
        state.activeTopicIndex = 0
      })
  },
  initialState,
  name: 'topic',
  reducers: {},
})

export default topicReducer

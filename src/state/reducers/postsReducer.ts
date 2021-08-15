import { createAction, createSlice } from '@reduxjs/toolkit'
import { Topic } from '../../../backend/db/model'
import { fetchPosts } from '../actions'

type APPState = {
  activePost: null | Topic
  activePostIndex: number
  activePostId: number
  extraScreens: string[]
  status: 'loading' | 'idle'
  error: string | null
  list: Topic[]
  postCount: number
}

const initialState: APPState = {
  activePost: null,
  activePostId: -1,
  activePostIndex: -1,
  error: null,
  extraScreens: [],
  list: [] as Topic[],
  postCount: 0,
  status: 'idle',
}

const postsReducer = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.list = payload
      })
  },
  initialState,
  name: 'posts',
  reducers: {},
})

export default postsReducer

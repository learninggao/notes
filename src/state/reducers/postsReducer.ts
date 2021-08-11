import { createAction, createSlice } from '@reduxjs/toolkit'
import {
  fetchPosts,
} from '../actions'
import { PlabPost } from '../models/post'

type APPState = {
  activePost: null | PlabPost
  activePostIndex: number
  activePostId: number
  extraScreens: string[]
  status: 'loading' | 'idle'
  error: string | null
  list: PlabPost[]
  postCount: number
}

const initialState: APPState = {
  activePost: null,
  activePostIndex: -1,
  activePostId: -1,
  error: null,
  extraScreens: [],
  list: [] as PlabPost[],
  status: 'idle',
  postCount: 0,
}

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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
})

export default postsReducer

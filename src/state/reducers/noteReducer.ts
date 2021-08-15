import { createAction, createSlice } from '@reduxjs/toolkit'
import { Note } from '../../../backend/db/model'
import { fetchNotesForTopic } from '../actions'

type APPState = {
  activeNoteId: number
  activeNoteIndex: number
  status: 'loading' | 'idle'
  error: string | null
  list: Note[]
}

const initialState: APPState = {
  activeNoteId: -1,
  activeNoteIndex: -1,
  error: null,
  list: [] as Note[],
  status: 'idle',
}

const noteReducer = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesForTopic.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchNotesForTopic.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.list = payload
        state.activeNoteId = payload[0].id
        state.activeNoteIndex = 0
      })
  },
  initialState,
  name: 'note',
  reducers: {},
})

export default noteReducer

import { createAction, createSlice } from '@reduxjs/toolkit'
import { Note } from '../../types'
import {
  fetchAddExistingTagToNote,
  fetchCreateNote,
  fetchNotesForTopic,
} from '../actions'
import { fetchAddNewTag, fetchRemoveTagFromNote } from '../actions/noteActions'

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

export const setActiveNote = createAction<number>('set_active_note')

const noteReducer = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(setActiveNote, (state, { payload }) => {
        state.activeNoteId = payload
      })
      .addCase(fetchNotesForTopic.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchNotesForTopic.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.list = payload
        state.activeNoteId = payload[0] ? payload[0].id : -1
        state.activeNoteIndex = 0
      })
      // TODO: fetchCreate.pending
      .addCase(fetchCreateNote.fulfilled, (state, { payload }) => {
        state.list.push(payload)
        state.activeNoteId = payload.id
        state.activeNoteIndex = state.list.length - 1
      })
      .addCase(fetchAddExistingTagToNote.fulfilled, (state, { payload }) => {
        const noteIndex = state.list.findIndex((note) => note.id === payload.id)
        state.list.splice(noteIndex, 1, payload)
      })
      .addCase(fetchRemoveTagFromNote.fulfilled, (state, { payload }) => {
        const noteIndex = state.list.findIndex((note) => note.id === payload.id)
        state.list.splice(noteIndex, 1, payload)
      })
      .addCase(fetchAddNewTag.fulfilled, (state, { payload }) => {
        const noteIndex = state.list.findIndex((note) => note.id === payload.id)
        state.list.splice(noteIndex, 1, payload)
      })
  },
  initialState,
  name: 'note',
  reducers: {},
})

export default noteReducer

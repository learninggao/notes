import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NotePayload } from '../../components/addNote/addNoteDialog'
import { Note } from '../../types'

export const API_URL = 'http://localhost:3001/api'

const NOTE_API_URL = `${API_URL}/note`

export const fetchCreateNote = createAsyncThunk(
  'create_note',
  async (note: NotePayload) => {
    const { data } = await axios.post<Note>(NOTE_API_URL, {
      note,
    })
    return data
  }
)

export const fetchAddExistingTagToNote = createAsyncThunk(
  'add_existing_tag_to_note',
  async ({ noteId, tag }: { noteId: number; tag: string }) => {
    const { data } = await axios.put<Note>(NOTE_API_URL, {
      noteId,
      operation: 'ASSOCIATE_TAG',
      tag,
    })
    return data
  }
)

export const fetchRemoveTagFromNote = createAsyncThunk(
  'remove_tag_from_note',
  async (params: { noteId: number; tag: string }) => {
    const { data } = await axios.delete<Note>(NOTE_API_URL, {
      data: {
        ...params,
        operation: 'REMOVE_TAG',
      },
    })

    return data
  }
)

export const fetchAddNewTag = createAsyncThunk(
  'add_new_tag',
  async (params: { noteId: number; tag: string }) => {
    const { data } = await axios.put<Note>(NOTE_API_URL, {
      ...params,
      operation: 'ADD_NEW_TAG',
    })

    return data
  }
)

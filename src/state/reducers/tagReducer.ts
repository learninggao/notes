import { createAction, createSlice } from '@reduxjs/toolkit'
import { fetchTags } from '../actions'

type TagState = {
  list: string[]
  status: 'loading' | 'idle'
  error: string | null
  filteredList: SuggestionItem[]
}

type SuggestionItem = [string, boolean]

const initialState: TagState = {
  error: '',
  filteredList: [] as SuggestionItem[],
  list: [] as string[],
  status: 'idle',
}

export const typeTag = createAction<string>('type_tag')

const tagReducer = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(typeTag, (state, { payload }) => {
        const newFilteredList = state.list.filter((item) =>
          item.includes(payload)
        )
        state.filteredList = newFilteredList
          .slice(0, 20)
          .map((item) => [item, false])
        if (newFilteredList.length === 0 && payload) {
          state.filteredList = [[payload, true]]
        }
      })
      .addCase(fetchTags.fulfilled, (state, { payload }) => {
        state.list = payload
      })
  },
  initialState,
  name: 'tag',
  reducers: {},
})

export default tagReducer

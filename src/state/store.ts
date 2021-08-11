import { configureStore } from '@reduxjs/toolkit'
import posts from './reducers/postsReducer'

// todo
// use caseReducer to bring out loading, and error to the front of the store
// may make sense to have both local and global loading/error?

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

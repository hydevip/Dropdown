import { configureStore } from '@reduxjs/toolkit';
import managersReducer from './slices/managersSlice'

export const store = configureStore({
  reducer: {
      managers: managersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
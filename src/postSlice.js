import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()

  return data
})

const initialState = {
  postList: [],
  fetchingPosts: false,
  errorMessage: null
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.postList = action.payload
      state.fetchingPosts = false
    },
    [fetchPosts.pending]: state => {
      state.fetchingPosts = true
    },
    [fetchPosts.rejected]: state => {
      state.fetchingPosts = false
      state.errorMessage = 'Something went wrong...'
    }
  }
})

export default postSlice.reducer

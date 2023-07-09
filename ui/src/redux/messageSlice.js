import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // import the Axios instance



// Async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  'messages/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/messages');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
  'messages/send',
  async ({ message }, thunkAPI) => {
    try {
      await api.post('http://localhost:3000/send', { message });
      return { message };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const messagesSlice = createSlice({
  name: 'messages',
  initialState: { entities: [], loading: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.entities = action.payload;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.loading = 'error';
      state.error = action.payload;
    },
    [sendMessage.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.entities.push(action.payload);
    },
    [sendMessage.rejected]: (state, action) => {
      state.loading = 'error';
      state.error = action.payload;
    },
  },
});

export default messagesSlice.reducer;

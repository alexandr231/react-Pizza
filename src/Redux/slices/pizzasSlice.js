import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
  const { currentPage, categoryRequest, sortBy, order, searchInput } = params;
  const response = await axios.get(
    `https://63e3bb4365ae49317716207a.mockapi.io/items?page=${currentPage}&limit=4&${categoryRequest}${sortBy}&order=${order}&search=${searchInput}`,
  );
  return response.data;
});

const initialState = {
  items: [],
  loading: 'idle',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = 'succeeded'
    },
    [fetchPizzas.pending]: (state, action) => {
      state.items = [];
      state.loading = 'pending'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.loading = 'failed'
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;

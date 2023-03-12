import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizzas/fetchPizzas', async (params) => {
  const { currentPage, categoryId, sortBy, order, searchInput } = params;
  const {data} = await axios.get<Pizza[]>(
    `https://63e3bb4365ae49317716207a.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}${sortBy}&order=${order}&search=${searchInput}`,
  );
  return data;
});

const initialState: PizzaSliceState = {
  items: [],
  loading: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.loading = Status.LOADING;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.loading = Status.ERROR;
      state.items = [];
    })
  }

});

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;

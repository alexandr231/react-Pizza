import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage:1,
  searchInput:'',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
        state.categoryId = action.payload;
    },
    setSort(state, action) {
        state.sort = action.payload;
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
    },
    setSearchInput(state, action) {
        state.searchInput = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setSearchInput } = filterSlice.actions;

export default filterSlice.reducer;

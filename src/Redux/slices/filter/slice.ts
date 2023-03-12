import { Sort, SortPropertyEnum } from './../filter/types';
import { FilterSliceState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  currentPage:1,
  searchInput:'',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
        state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
    },
    setSearchInput(state, action: PayloadAction<string>) {
        state.searchInput = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setSearchInput, setFilters } = filterSlice.actions;

export default filterSlice.reducer;

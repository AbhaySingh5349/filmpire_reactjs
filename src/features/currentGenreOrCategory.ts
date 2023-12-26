import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreOrCategoryState {
  genreIdOrCategoryName: string;
  page: number;
  searchQuery: string;
}

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  } as GenreOrCategoryState,
  reducers: {
    selectGenreOrCategory: (prevState, action: PayloadAction<string>) => {
      prevState.genreIdOrCategoryName = action.payload;
      prevState.searchQuery = '';
    },
    searchMovie: (prevState, action: PayloadAction<string>) => {
      console.log('action.payload for search movie: ', action.payload);
      prevState.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

// whenever we have reducer, attach it to store
export default genreOrCategory.reducer;

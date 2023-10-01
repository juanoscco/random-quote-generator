import { createSlice } from '@reduxjs/toolkit';
import { fetchQuote } from '../actions/actionsQuote';

interface QuoteState {
  data: {
    _id: string;
    quoteText: string;
    quoteAuthor: string;
    quoteGenre: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuoteState = {
  data: null,
  loading: false,
  error: null,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});



export default quoteSlice.reducer;

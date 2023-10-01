import { fetchAuthorQuotes } from "../actions/actionsQuote";
import { createSlice } from "@reduxjs/toolkit";


interface AuthorQuote {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
  __v: number;
}

// Define el estado inicial
interface AuthorQuotesState {
  data: AuthorQuote[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthorQuotesState = {
  data: [],
  loading: false,
  error: null,
};

const authorQuotesSlice = createSlice({
  name: "authorQuotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorQuotes.pending, (state) => {
        // Marca como loading cuando se inicia la carga
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorQuotes.fulfilled, (state, action) => {
        // Almacena las citas del autor en el estado cuando se completa con éxito
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAuthorQuotes.rejected, (state, action) => {
        // Maneja el error cuando la carga falla y almacena el mensaje de error
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authorQuotesSlice.reducer;

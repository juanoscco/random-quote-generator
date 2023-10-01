import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuote = createAsyncThunk("quote/fetch", async () => {
  const response = await axios.get(
    "https://quote-garden.onrender.com/api/v3/quotes/random"
  );
  return response.data.data[0];
});

export const fetchAuthorQuotes = createAsyncThunk(
  "quote/fetchAuthor",
  async (author: string) => {
    const response = await axios.get(
      `https://quote-garden.onrender.com/api/v3/quotes?author=${encodeURIComponent(
        author
      )}`
    );
    return response.data.data;
  }
);

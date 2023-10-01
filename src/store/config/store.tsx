import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../reducers/reducerQuote';
import authorQuotesReducer from "../reducers/authorQuoteReducer";

const store = configureStore({
  reducer: {
    quote: quoteReducer,
    authorQuotes: authorQuotesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

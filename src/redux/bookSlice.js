import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("fetchBooks", async ({ searchTerm, filterBy }) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}${
    filterBy && `&filter=${filterBy}`
  }&key=${process.env.REACT_APP_GOOGLE_KEY}`;

  const {
    data: { items, totalItems },
  } = await axios(endpoint);
  return { items, totalItems, searchTerm, filterBy };
});

export const sortBooks = createAsyncThunk("sortBooks", async ({ searchTerm, filterBy }) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}${
    filterBy && `&filter=${filterBy}`
  }&orderBy=newest&key=${process.env.REACT_APP_GOOGLE_KEY}`;

  const {
    data: { items, totalItems },
  } = await axios(endpoint);
  return { items, totalItems, searchTerm, filterBy };
});

export const filterBooks = createAsyncThunk("filterBooks", async ({ searchTerm, filterBy }) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}${
    filterBy && `&filter=${filterBy}`
  }&key=${process.env.REACT_APP_GOOGLE_KEY}`;

  const {
    data: { items, totalItems },
  } = await axios(endpoint);
  return { items, totalItems, searchTerm, filterBy };
});

export const loadMoreBooks = createAsyncThunk("loadMoreBooks", async ({ searchTerm, filterBy, startIndex }) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}${
    filterBy && `&filter=${filterBy}`
  }&key=${process.env.REACT_APP_GOOGLE_KEY}&startIndex=${startIndex}`;

  const {
    data: { items, totalItems },
  } = await axios(endpoint);
  return { items, totalItems, searchTerm, filterBy, startIndex };
});

export const slice = createSlice({
  name: "books",
  initialState: { books: [], status: null, filterBy: "", totalItems: null, searchTerm: "", startIndex: 10 },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = "loading";
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.books = action.payload.items;
      state.searchTerm = action.payload.searchTerm;
      state.totalItems = action.payload.totalItems;
      state.filterBy = action.payload.filterBy;
      state.status = "success";
    },
    [fetchBooks.rejected]: (state) => {
      state.status = "failed";
    },
    [sortBooks.pending]: (state) => {
      state.status = "loading";
    },
    [sortBooks.fulfilled]: (state, action) => {
      state.books = action.payload.items;
      state.searchTerm = action.payload.searchTerm;
      state.totalItems = action.payload.totalItems;
      state.filterBy = action.payload.filterBy;
      state.status = "success";
    },
    [sortBooks.rejected]: (state) => {
      state.status = "failed";
    },
    [filterBooks.pending]: (state) => {
      state.status = "loading";
    },
    [filterBooks.fulfilled]: (state, action) => {
      state.books = action.payload.items;
      state.searchTerm = action.payload.searchTerm;
      state.totalItems = action.payload.totalItems;
      state.filterBy = action.payload.filterBy;
      state.status = "success";
    },
    [filterBooks.rejected]: (state) => {
      state.status = "failed";
    },
    [loadMoreBooks.pending]: (state) => {
      state.status = "loading";
    },
    [loadMoreBooks.fulfilled]: (state, action) => {
      state.books = [...state.books, ...action.payload.items];
      state.searchTerm = action.payload.searchTerm;
      state.totalItems = action.payload.totalItems;
      state.filterBy = action.payload.filterBy;
      state.startIndex = action.payload.startIndex;
      state.status = "success";
    },
    [loadMoreBooks.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { setSearchTerm, setStartIndex } = slice.actions;

export default slice.reducer;

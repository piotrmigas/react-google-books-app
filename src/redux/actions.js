import axios from "axios";

export const fetchBooks = (searchTerm) => async (dispatch) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}&key=${
    process.env.REACT_APP_GOOGLE_KEY
  }`;

  try {
    dispatch({ type: "FETCH_BOOKS_REQUEST" });
    const { data } = await axios(endpoint);
    const { items, totalItems } = data;
    dispatch({
      type: "FETCH_BOOKS_SUCCESS",
      payload: { items, totalItems },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_BOOKS_ERROR",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const sortBooks = (searchTerm, filterBy) => async (dispatch) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}${
    filterBy && `&filter=${filterBy}`
  }&orderBy=newest&key=${process.env.REACT_APP_GOOGLE_KEY}`;

  try {
    dispatch({ type: "SORT_BOOKS_REQUEST" });
    const { data } = await axios(endpoint);
    const { items, totalItems } = data;
    dispatch({
      type: "SORT_BOOKS_SUCCESS",
      payload: { items, totalItems },
    });
  } catch (error) {
    dispatch({
      type: "SORT_BOOKS_ERROR",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const filterBooks = (searchTerm, filterBy) => async (dispatch) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}${
    filterBy && `&filter=${filterBy}`
  }&key=${process.env.REACT_APP_GOOGLE_KEY}`;

  try {
    dispatch({ type: "FILTER_BOOKS_REQUEST" });
    const { data } = await axios(endpoint);
    const { items, totalItems } = data;
    dispatch({
      type: "FILTER_BOOKS_SUCCESS",
      payload: { items, filterBy, totalItems },
    });
  } catch (error) {
    dispatch({
      type: "FILTER_BOOKS_ERROR",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const loadMoreBooks = (searchTerm, startIndex) => async (dispatch) => {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? searchTerm : "programming"}&key=${
    process.env.REACT_APP_GOOGLE_KEY
  }&startIndex=${startIndex}`;

  try {
    dispatch({ type: "LOAD_MORE_REQUEST" });
    const { data } = await axios(endpoint);
    const { items, totalItems } = data;
    dispatch({
      type: "LOAD_MORE_SUCCESS",
      payload: { items, totalItems },
    });
  } catch (error) {
    dispatch({
      type: "LOAD_MORE_ERROR",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

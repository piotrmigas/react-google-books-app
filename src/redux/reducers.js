export const booksReducer = (
  state = { loading: false, error: null, books: [], filterBy: "", totalItems: null },
  action
) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.payload.items,
        totalItems: action.payload.totalItems,
      };
    case "FETCH_BOOKS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SORT_BOOKS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SORT_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.payload.items,
        totalItems: action.payload.totalItems,
      };
    case "SORT_BOOKS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "FILTER_BOOKS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FILTER_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.payload.items,
        totalItems: action.payload.totalItems,
        filterBy: action.payload.filterBy,
      };
    case "FILTER_BOOKS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOAD_MORE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOAD_MORE_SUCCESS":
      return {
        ...state,
        books: [...state.books, ...action.payload.items],
        totalItems: action.payload.totalItems,
        loading: false,
      };
    case "LOAD_BOOKS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

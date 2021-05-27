import { useState, useRef, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/bookSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const initial = useRef(null);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      dispatch(setSearchTerm(state));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, state]);

  return (
    <SearchBar
      autoFocus
      placeholder="Search Books..."
      value={state}
      onChange={(value) => setState(value)}
      onCancelSearch={() => setState("")}
      style={{
        margin: "10px auto",
        maxWidth: 250,
      }}
    />
  );
};

export default Search;

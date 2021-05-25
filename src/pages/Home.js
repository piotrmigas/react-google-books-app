import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import { fetchBooks, sortBooks, loadMoreBooks } from "../redux/actions";
import Search from "../components/Search";
import BookCard from "../components/BookCard";
import FilterBtn from "../components/FilterBtn";

const useStyles = makeStyles({
  spinner: {
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttons: { display: "flex", justifyContent: "center", marginBottom: 20 },
  button: { marginTop: 10, marginBottom: 10, marginRight: 20 },
});

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(10);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks(searchTerm));
  }, [dispatch, searchTerm]);

  const { loading, error, books, filterBy, totalItems } = useSelector((state) => state);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const loadMore = () => {
    setStartIndex(startIndex + 11);
    dispatch(loadMoreBooks(searchTerm, startIndex));
  };

  return (
    <Container>
      <Search setSearchTerm={setSearchTerm} />
      <Typography variant="h5" className={classes.header}>
        {`${searchTerm ? "Search results" : "Programming books"}:`}
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={() => dispatch(sortBooks(searchTerm, filterBy))}
        >
          Sort by newest
        </Button>
        <FilterBtn searchTerm={searchTerm} />
      </div>
      {error && <p>Error fetching books</p>}
      {searchTerm && books.length === undefined && <h3>No matching books found!</h3>}
      <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </Masonry>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      )}
      {books.length < totalItems && !loading && (
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Home;

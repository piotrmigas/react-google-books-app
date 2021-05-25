import { Typography, Card, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import noImg from "../assets/noImg.png";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  actions: {
    textAlign: "center",
    marginBottom: "10px",
  },
  author: {
    marginRight: "10px",
    wordBrake: "break-word",
  },
});

const BookCard = ({ book }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Card className={classes.root}>
      <img
        alt={book.volumeInfo.title}
        src={book.volumeInfo.imageLinks === undefined ? noImg : `${book.volumeInfo.imageLinks.thumbnail}`}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6">
            {book.volumeInfo.title}
          </Typography>
        </CardContent>
        <div className={classes.actions}>
          <Link
            to={{
              pathname: `/book/${book.id}`,
              state: { background: location },
            }}
          >
            <Button size="small" color="primary">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;

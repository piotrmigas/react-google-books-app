import { Chip, Paper, Grid, Typography, Modal, Fade, Backdrop, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import noImg from "../assets/noImg.png";
import Rating from "../components/Rating";

const useStyles = makeStyles({
  modal: {
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 2000,
    position: "fixed",
    paddingTop: "2%",
  },
  paper: {
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    width: "95vw",
    height: "90vh",
    maxHeight: 700,
    maxWidth: 600,
    position: "relative",
    overflow: "hidden",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    textAlign: "left",
    overflow: "auto",
    padding: 14,
  },
  date: {
    display: "inline",
    wordWrap: "break-word",
  },
  chip: {
    marginBottom: 5,
    marginRight: 5,
  },
  close: {
    marginLeft: "auto",
    cursor: "pointer",
  },
});

const Book = () => {
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const { volumeInfo } = useSelector((state) => state.books.find((book) => book.id === id));
  const history = useHistory();

  const closeModal = (e) => {
    setOpen(false);
    e.stopPropagation();
    history.goBack();
  };

  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <Grid container spacing={2} className={classes.content}>
            <Grid item>
              <img
                alt={volumeInfo.title}
                src={volumeInfo.imageLinks === undefined ? noImg : `${volumeInfo.imageLinks.thumbnail}`}
              />
              {volumeInfo.averageRating && (
                <Rating rating={volumeInfo.averageRating} reviews={volumeInfo.ratingsCount} />
              )}
            </Grid>
            <Grid item className={classes.close}>
              <CloseIcon onClick={closeModal} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs className={classes.container}>
                  <Box mb={2}>
                    <Typography gutterBottom variant="subtitle1">
                      {volumeInfo.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {volumeInfo.description}
                    </Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary" component="span" className={classes.author}>
                      {`Author${volumeInfo.authors.length === 1 ? "" : "s"}: `}
                    </Typography>
                    {volumeInfo.authors.map((author, i) => (
                      <Chip key={i} label={author} className={classes.chip} size="small" />
                    ))}
                  </Box>
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary" className={classes.date}>
                      Publisher:{" "}
                    </Typography>
                    <Typography variant="body2" className={classes.date}>
                      {volumeInfo.publisher}
                    </Typography>
                  </Box>
                  {!volumeInfo.publishedDate === undefined && (
                    <Box mb={1}>
                      <Typography variant="body2" color="textSecondary" className={classes.date}>
                        Published:{" "}
                      </Typography>
                      <Typography variant="body2" className={classes.date}>
                        {volumeInfo.publishedDate}
                      </Typography>
                    </Box>
                  )}
                  {!volumeInfo.language === undefined && (
                    <Box mb={1}>
                      <Typography variant="body2" color="textSecondary" className={classes.date}>
                        Language:{" "}
                      </Typography>
                      <Typography variant="body2" className={classes.date}>
                        {new Intl.DisplayNames([], { type: "language" }).of(volumeInfo.language)}
                      </Typography>
                    </Box>
                  )}
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary" className={classes.date}>
                      Page count:{" "}
                    </Typography>
                    <Typography variant="body2" className={classes.date}>
                      {volumeInfo.pageCount}
                    </Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary" component="span">
                      Category:{" "}
                    </Typography>
                    {volumeInfo.categories.map((category, i) => (
                      <Chip key={i} label={category} className={classes.chip} size="small" />
                    ))}
                  </Box>
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary" className={classes.date}>
                      Preview:{" "}
                    </Typography>
                    <Typography variant="body2" className={classes.date} component="div">
                      <a href={volumeInfo.previewLink}>{volumeInfo.previewLink}</a>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default Book;

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";

const useStyles = makeStyles({
  star: {
    color: "#f8e825",
    margin: "0.1rem",
  },
});

const Rating = ({ rating, reviews }) => {
  const classes = useStyles();

  return (
    <div className={classes.rating}>
      <span className={classes.star}>
        {rating >= 1 ? <StarIcon /> : rating >= 0.5 ? <StarHalfIcon /> : <StarIcon />}
      </span>
      <span className={classes.star}>
        {rating >= 2 ? <StarIcon /> : rating >= 1.5 ? <StarHalfIcon /> : <StarIcon />}
      </span>
      <span className={classes.star}>
        {rating >= 3 ? <StarIcon /> : rating >= 2.5 ? <StarHalfIcon /> : <StarIcon />}
      </span>
      <span className={classes.star}>
        {rating >= 4 ? <StarIcon /> : rating >= 3.5 ? <StarHalfIcon /> : <StarIcon />}
      </span>
      <span className={classes.star}>
        {rating >= 5 ? <StarIcon /> : rating >= 4.5 ? <StarHalfIcon /> : <StarIcon />}
      </span>
      <Typography variant="body2">
        {reviews} review{reviews > 1 && "s"}
      </Typography>
    </div>
  );
};

export default Rating;

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { filterBooks } from "../redux/actions";

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
    alignItems: "top",
  },
});

const FilterBtn = ({ searchTerm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Filter</InputLabel>
      <Select defaultValue="" onChange={(e) => dispatch(filterBooks(searchTerm, e.target.value))}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="free-ebooks">Free E-books</MenuItem>
        <MenuItem value="paid-ebooks">Paid E-books</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterBtn;

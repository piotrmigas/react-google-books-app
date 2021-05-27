import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { filterBooks } from "../redux/bookSlice";

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
    alignItems: "top",
  },
});

const FilterBtn = ({ searchTerm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const filterBy = e.target.value;
    dispatch(filterBooks({ searchTerm, filterBy }));
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Filter</InputLabel>
      <Select defaultValue="" onChange={handleChange}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="free-ebooks">Free E-books</MenuItem>
        <MenuItem value="paid-ebooks">Paid E-books</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterBtn;

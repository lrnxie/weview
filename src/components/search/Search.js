import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "600px",
  },
}));

const Search = ({ history }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      history.push(`search/${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <Box className={classes.root} mx="auto" my={5}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search a movie or TV show..."
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </Box>
  );
};

export default withRouter(Search);

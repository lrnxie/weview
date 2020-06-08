import React, { useState } from "react";
import axios from "axios";

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

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const searchQuery = async (query) => {
    const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}
    `);
    console.log(
      res.data.results.filter((item) => item.media_type !== "person")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      searchQuery(query);
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

export default Search;

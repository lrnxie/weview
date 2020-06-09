import React, { useEffect, useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  poster: {
    height: "150px",
    width: "100px",
    objectFit: "scale-down",
  },
  details: {
    marginLeft: theme.spacing(2),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
}));

const Results = ({ match }) => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const query = match.params.query;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      const searchResults = res.data.results.filter(
        (item) => item.media_type !== "person"
      );
      setResults(searchResults);
    };
    fetchData();
  }, [query]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Search results for "{query}"</Typography>
      {results.length ? (
        <List>
          {results.map((result, index) => (
            <ListItem key={index}>
              <img
                className={classes.poster}
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg"
                }
                alt=""
              />
              <div className={classes.details}>
                <Typography variant="subtitle1">
                  {result.title || result.name}{" "}
                  {result.release_date &&
                    `(${result.release_date.slice(0, 4)})`}
                  {result.first_air_date &&
                    `(${result.first_air_date.slice(0, 4)})`}
                </Typography>
                <Typography variant="subtitle2">
                  <span role="img" aria-label="star">
                    ⭐️
                  </span>
                  {result.vote_average === 0 ? "N/A" : result.vote_average}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Results;

import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleLineGridList from "../layout/SingleLineGridList";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

const TrendingMovies = ({ type }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      setData(res.data.results);
      setLoading(false);
    };
    fetchData();
  }, [type]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Today's Trending {type === "movie" ? "Movies" : "TV shows"}
      </Typography>
      <SingleLineGridList tileData={data} loading={loading} />
    </div>
  );
};

export default TrendingMovies;

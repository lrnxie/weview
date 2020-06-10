import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import TvDetails from "./TvDetails";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(8),
  },
}));

const Details = ({ match }) => {
  const classes = useStyles();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { type, id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      setDetails(res.data);
      setLoading(false);
    };
    fetchData();
  }, [type, id]);

  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : type === "movie" ? (
    <MovieDetails details={details} />
  ) : (
    <TvDetails details={details} />
  );
};

export default Details;
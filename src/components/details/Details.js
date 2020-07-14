import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import MovieDetails from "./MovieDetails";
import TvDetails from "./TvDetails";

const useStyles = makeStyles((theme) => ({
  status: {
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
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setDetails(res.data);
        setLoading(false);
      } catch (err) {
        setDetails(err.response.data);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  return loading ? (
    <div className={classes.status}>
      <CircularProgress />
    </div>
  ) : details.status_message ? (
    <Typography className={classes.status}>{details.status_message}</Typography>
  ) : type === "movie" ? (
    <MovieDetails details={details} />
  ) : (
    <TvDetails details={details} />
  );
};

export default Details;

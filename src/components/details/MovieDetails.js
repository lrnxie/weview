import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

import UserRating from "./UserRating";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  rating: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      marginLeft: theme.spacing(1),
    },
  },
  poster: {
    height: "325px",
    objectFit: "scale-down",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  details: {
    "& > *": {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
    },
  },
}));

const MovieDetails = ({ details }) => {
  const classes = useStyles();
  const {
    poster_path,
    title,
    release_date,
    runtime,
    genres,
    vote_average,
    overview,
    id,
  } = details;

  return (
    <div className={classes.root}>
      <img
        className={classes.poster}
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg"
        }
        alt={title}
      />

      <div className={classes.details}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle2">
          {release_date}
          {runtime !== 0 && ` | ${runtime} min`}
        </Typography>
        <Typography variant="subtitle2">
          Genres:{" "}
          {genres &&
            genres.map((genre, index) => (index ? ", " : "") + genre.name)}
        </Typography>

        <div className={classes.rating}>
          <Rating value={vote_average / 2} precision={0.5} readOnly />
          <Typography variant="body2">
            {vote_average === 0 ? "N/A" : vote_average}
          </Typography>
        </div>

        <div className={classes.rating}>
          <UserRating
            type="movie"
            media_id={id}
            title={title}
            poster_path={poster_path}
          />
          <Typography variant="body2">My Rating</Typography>
        </div>

        <div>
          <Typography variant="h6">Overview</Typography>
          <Typography variant="body2">{overview}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
